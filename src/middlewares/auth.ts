import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
<<<<<<< HEAD
import { AppError } from "../utils/AppError";
import httpStatus from "http-status-codes";
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        name: string;
        id: string;
        role: Role;
      };
    }
  }
}

export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies.accessToken ? req.cookies.accessToken :
      req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization?.split(" ")[1]
      : req.headers.authorization;

    if (!token) {
<<<<<<< HEAD
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not logged in. Please log in to access this resource.");
=======
      throw new Error(
        "You are not logged in. Please log in to access this resource.",
      );
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    }

    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_acess_secret);

    if (!verifiedToken.success) {
<<<<<<< HEAD
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token. Please log in again.");
=======
      throw new Error(verifiedToken.error);
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    }

    const { email, name, id, role } = verifiedToken.data as JwtPayload;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
<<<<<<< HEAD
      throw new AppError(httpStatus.FORBIDDEN, "Forbidden. You don't have permission to access this resource.");
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User not found. Please log in again.");
    }

    if (user.status === "SUSPENDED") {
      throw new AppError(httpStatus.FORBIDDEN, "Your account has been suspended. Please contact support team.");
=======
      throw new Error(
        "Forbidden. You don't have permission to access this resource.",
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found. Please log in again.");
    }

    if (user.status === "SUSPENDED") {
      throw new Error(
        "Your account has been suspened. Please contact with support team.",
      );
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    }

    req.user = {
      email,
      name,
      id,
      role,
    };

    next();
  });
};