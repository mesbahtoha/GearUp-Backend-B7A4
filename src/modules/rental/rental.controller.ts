import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { rentalService } from "./rental.service";

const createRental = catchAsync(
  async (req: Request, res: Response) => {
    const rental =
      await rentalService.createRentalIntoDB(
        req.user!.id,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message:
        "Rental order placed successfully",
      data: rental,
    });
  }
);

const getMyRentals = catchAsync(
  async (req: Request, res: Response) => {
    const rentals =
      await rentalService.getMyRentalsFromDB(
        req.user!.id
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "My rentals retrieved successfully",
      data: rentals,
    });
  }
);

const getSingleRental = catchAsync(
  async (req: Request, res: Response) => {
    const rental =
      await rentalService.getSingleRentalFromDB(
        req.params.id as string
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "Rental retrieved successfully",
      data: rental,
    });
  }
);

const getProviderRentalRequests =
  catchAsync(
    async (req: Request, res: Response) => {
      const rentals =
        await rentalService.getProviderRentalRequestsFromDB(
          req.user!.id
        );

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message:
          "Rental requests retrieved successfully",
        data: rentals,
      });
    }
  );

const getAllRentals = catchAsync(
  async (req: Request, res: Response) => {
    const rentals =
      await rentalService.getAllRentalsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "All rentals retrieved successfully",
      data: rentals,
    });
  }
);

export const rentalController = {
  createRental,
  getMyRentals,
  getSingleRental,
  getProviderRentalRequests,
  getAllRentals,
};