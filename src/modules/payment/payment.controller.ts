import { Request, Response } from "express";

import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { paymentService } from "./payment.service";

const createCheckoutSession =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {

      const result =
        await paymentService.createCheckoutSession(
          req.params
            .rentalId as string,
          req.user!.id
        );

      sendResponse(res, {
        success: true,
        statusCode:
          httpStatus.OK,
        message:
          "Checkout session created successfully",
        data: result,
      });
    }
  );

export const paymentController = {
  createCheckoutSession,
};