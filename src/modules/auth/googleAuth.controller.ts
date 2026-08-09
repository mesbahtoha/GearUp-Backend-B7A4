import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/AppError";
import { googleAuthService } from "./googleAuth.service";

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

const redirectToGoogle = catchAsync(async (req: Request, res: Response) => {
  if (!googleAuthService.isConfigured()) {
    throw new AppError(
      httpStatus.SERVICE_UNAVAILABLE,
      "Google login is not configured. Please use email login instead.",
    );
  }

  const state = googleAuthService.generateOAuthState();
  res.cookie("google_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 10,
  });

  const url = googleAuthService.getAuthorizationUrl(state);
  res.redirect(url);
});

const googleCallback = catchAsync(async (req: Request, res: Response) => {
  const { code, state, error } = req.query;

  if (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, `Google login failed: ${error}`);
  }

  if (!code || !state) {
    throw new AppError(httpStatus.BAD_REQUEST, "Missing Google authorization code or state");
  }

  const expectedState = req.cookies.google_oauth_state;
  res.clearCookie("google_oauth_state");

  if (!expectedState || expectedState !== state) {
    throw new AppError(httpStatus.FORBIDDEN, "Invalid OAuth state. Please try again.");
  }

  const { access_token } = await googleAuthService.exchangeCodeForTokens(String(code));
  const profile = await googleAuthService.fetchGoogleProfile(access_token);

  if (!profile.email || !profile.email_verified) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Google account email is not verified");
  }

  const tokens = await googleAuthService.googleLoginIntoDB({
    email: profile.email,
    name: profile.name || "Google User",
    picture: profile.picture,
  });

  setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

  const dashboardPath =
    tokens.role === "ADMIN" ? "/dashboard/admin" : tokens.role === "PROVIDER" ? "/dashboard/provider" : "/dashboard/customer";

  res.redirect(`${process.env.CLIENT_URL || "http://localhost:3000"}${dashboardPath}`);
});

export const googleAuthController = {
  redirectToGoogle,
  googleCallback,
};
