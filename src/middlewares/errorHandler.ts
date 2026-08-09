import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { Prisma } from "../../generated/prisma/client";
import { AppError } from "../utils/AppError";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = error.statusCode || error.status || httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong";

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2025":
        statusCode = httpStatus.NOT_FOUND;
        message = "Resource not found";
        break;
      case "P2002":
        statusCode = httpStatus.CONFLICT;
        message = "A record with this value already exists";
        break;
      case "P2003":
        statusCode = httpStatus.BAD_REQUEST;
        message = "Invalid reference. The related record does not exist";
        break;
      default:
        statusCode = httpStatus.BAD_REQUEST;
        message = "Database request failed";
    }
  } else if (error instanceof Error) {
    message = error.message;
    if (!(error as any).statusCode && !(error as any).status) {
      statusCode = httpStatus.BAD_REQUEST;
    }
  }

  if (statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
    console.error("Unhandled error:", error);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
