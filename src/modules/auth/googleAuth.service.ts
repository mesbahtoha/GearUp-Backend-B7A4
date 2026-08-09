import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status-codes";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

const isConfigured = () => Boolean(config.google_client_id && config.google_client_secret);

const generateOAuthState = () => crypto.randomBytes(32).toString("hex");

const getAuthorizationUrl = (state: string) => {
  const params = new URLSearchParams({
    client_id: config.google_client_id,
    redirect_uri: config.google_redirect_uri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
};

const exchangeCodeForTokens = async (code: string) => {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: config.google_client_id,
      client_secret: config.google_client_secret,
      redirect_uri: config.google_redirect_uri,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Failed to exchange Google authorization code");
  }

  return response.json() as Promise<{ access_token: string; id_token: string }>;
};

const fetchGoogleProfile = async (accessToken: string) => {
  const response = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Failed to fetch Google profile");
  }

  return response.json() as Promise<{
    id: string;
    email: string;
    name: string;
    picture?: string;
    email_verified?: boolean;
  }>;
};

const googleLoginIntoDB = async (googleProfile: {
  email: string;
  name: string;
  picture?: string;
}) => {
  let user = await prisma.user.findUnique({
    where: { email: googleProfile.email },
  });

  if (!user) {
    const randomPassword = crypto.randomBytes(24).toString("hex");
    const hashedPassword = await bcrypt.hash(randomPassword, Number(config.bcrypt_salt_rounds));

    user = await prisma.user.create({
      data: {
        name: googleProfile.name,
        email: googleProfile.email,
        image: googleProfile.picture,
        password: hashedPassword,
      },
    });
  }

  if (user.status === "SUSPENDED") {
    throw new AppError(httpStatus.FORBIDDEN, "Your account has been suspended. Please contact support.");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_acess_secret,
    config.jwt_access_expires_in,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in,
  );

  return { accessToken, refreshToken, role: user.role };
};

export const googleAuthService = {
  isConfigured,
  generateOAuthState,
  getAuthorizationUrl,
  exchangeCodeForTokens,
  fetchGoogleProfile,
  googleLoginIntoDB,
};
