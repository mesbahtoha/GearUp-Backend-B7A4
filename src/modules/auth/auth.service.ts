import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status-codes";
import { IChangePassword, IForgotPassword, ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  if (!email?.trim()) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
  }

  if (!password?.trim()) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password.");
  }

  if (user.status === "SUSPENDED") {
    throw new AppError(httpStatus.FORBIDDEN, "Your account has been suspended. Please contact support.");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password.");
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

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "Refresh token is required");
  }

  const verifiedToken = jwtUtils.verifyToken(token, config.jwt_refresh_secret);

  if (!verifiedToken.success) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired refresh token");
  }

  const { id } = verifiedToken.data as JwtPayload;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found. Please log in again.");
  }

  if (user.status === "SUSPENDED") {
    throw new AppError(httpStatus.FORBIDDEN, "Your account has been suspended. Please contact support.");
  }

  const accessToken = jwtUtils.createToken(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    config.jwt_acess_secret,
    config.jwt_access_expires_in,
  );

  return {
    accessToken,
  };
};

const changePassword = async (userId: string, payload: IChangePassword) => {
  if (!payload.oldPassword?.trim()) {
    throw new AppError(httpStatus.BAD_REQUEST, "Old password is required");
  }

  if (!payload.newPassword?.trim()) {
    throw new AppError(httpStatus.BAD_REQUEST, "New password is required");
  }

  if (payload.newPassword.length < 6) {
    throw new AppError(httpStatus.BAD_REQUEST, "New password must be at least 6 characters");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not found.");
  }

  const isMatched = await bcrypt.compare(payload.oldPassword, user.password);

  if (!isMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Old password is incorrect");
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

const forgotPassword = async (payload: IForgotPassword) => {
  const { email, oldPassword, newPassword } = payload;

  if (!email?.trim()) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
  }

  if (!oldPassword?.trim()) {
    throw new AppError(httpStatus.BAD_REQUEST, "Current password is required");
  }

  if (!newPassword?.trim()) {
    throw new AppError(httpStatus.BAD_REQUEST, "New password is required");
  }

  if (newPassword.length < 6) {
    throw new AppError(httpStatus.BAD_REQUEST, "New password must be at least 6 characters");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const isMatched = await bcrypt.compare(oldPassword, user.password);

  if (!isMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return { message: "Password reset successfully. You can now log in with your new password." };
};

export const authService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
};
