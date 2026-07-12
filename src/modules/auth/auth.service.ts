import bcrypt from "bcryptjs";
import { SignOptions } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User does not exist!");
  }

  if (user.status === "SUSPENDED") {
    throw new Error(
      "Your account has been suspended. Please contact support."
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

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
    config.jwt_access_expires_in as SignOptions
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authService = {
  loginUser,
};