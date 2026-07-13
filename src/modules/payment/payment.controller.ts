import { Request, Response } from "express";

import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { paymentService } from "./payment.service";

const createPaymentIntent =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {

      const result =
        await paymentService.createPaymentIntentIntoDB(
          req.params.rentalId as string
        );

      sendResponse(res, {
        success: true,
        statusCode:
          httpStatus.OK,
        message:
          "Payment intent created successfully",
        data: result,
      });
    }
  );

export const paymentController = {
  createPaymentIntent,
};