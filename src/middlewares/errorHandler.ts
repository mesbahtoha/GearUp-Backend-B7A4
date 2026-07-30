import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
<<<<<<< HEAD
  let statusCode = error.statusCode || error.status || httpStatus.INTERNAL_SERVER_ERROR;
=======
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
  let message = "Something went wrong";

  if (error instanceof Error) {
    message = error.message;
  }

<<<<<<< HEAD
  if (statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
    console.error("Unhandled error:", error);
  }

=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
<<<<<<< HEAD
=======
    errorDetails: error,
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
  });
};