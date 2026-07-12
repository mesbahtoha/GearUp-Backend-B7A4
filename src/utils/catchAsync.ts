// import { NextFunction, Request, RequestHandler, Response } from "express";
// import httpStatus from "http-status-codes";

// export const catchAsync = (fn: RequestHandler) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//       console.error("Error in registerUser controller:", error);

//       res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//         success: false,
//         statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//         message: "An error occurred while registering the user.",
//         error: error instanceof Error ? error.message : "Unknown error",
//       });
//     }
//   };
// };


import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn: RequestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};