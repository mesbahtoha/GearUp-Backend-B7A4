import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong";

  if (error instanceof Error) {
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorDetails: error,
  });
};