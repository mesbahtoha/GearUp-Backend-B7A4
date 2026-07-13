import bcrypt from "bcryptjs";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { IChangePassword, ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  if (!email?.trim()) {
    throw new Error("Email is required");
  }

  if (!password?.trim()) {
    throw new Error("Password is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User does not exist!");
  }

  if (user.status === "SUSPENDED") {
    throw new Error("Your account has been suspended. Please contact support.");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid email or password.");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_acess_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Refresh token is required");
  }

  const verifiedToken = jwtUtils.verifyToken(token, config.jwt_refresh_secret);

  if (!verifiedToken.success) {
    throw new Error("Invalid refresh token");
  }

  const { id } = verifiedToken.data as JwtPayload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const accessToken = jwtUtils.createToken(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    config.jwt_acess_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  return {
    accessToken,
  };
};

const changePassword = async (userId: string, payload: IChangePassword) => {
  if (!payload.oldPassword?.trim()) {
    throw new Error("Old password is required");
  }

  if (!payload.newPassword?.trim()) {
    throw new Error("New password is required");
  }

  if (payload.newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const isMatched = await bcrypt.compare(payload.oldPassword, user.password);

  if (!isMatched) {
    throw new Error("Old password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      password: hashedPassword,
    },
  });

  return null;
};

export const authService = {
  loginUser,
  refreshToken,
  changePassword,
};
