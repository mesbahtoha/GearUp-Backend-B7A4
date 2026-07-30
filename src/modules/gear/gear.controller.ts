import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { gearService } from "./gear.service";

const createGear = catchAsync(
  async (req: Request, res: Response) => {
    const gear =
      await gearService.createGearIntoDB(
        req.user!.id,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message:
        "Gear created successfully",
      data: gear,
    });
  }
);

const getAllGears =
  catchAsync(async (req, res) => {

    const result =
      await gearService.getAllGearsFromDB(
        req.query
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "Gears retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  });

const getSingleGear = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await gearService.getSingleGearFromDB(
        req.params.id as string
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "Gear retrieved successfully",
      data: result,
    });
  }
);

const getMyGears = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await gearService.getMyGearsFromDB(
<<<<<<< HEAD
        req.user!.id,
        req.query as { page?: number; limit?: number }
=======
        req.user!.id
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "My gears retrieved successfully",
<<<<<<< HEAD
      data: result.data,
      meta: result.meta,
=======
      data: result,
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    });
  }
);

const updateGear = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await gearService.updateGearIntoDB(
        req.params.id as string,
        req.user!.id,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "Gear updated successfully",
      data: result,
    });
  }
);

const deleteGear = catchAsync(
  async (req: Request, res: Response) => {
    await gearService.deleteGearFromDB(
      req.params.id as string,
      req.user!.id
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "Gear deleted successfully",
      data: null,
    });
  }
);

export const gearController = {
  createGear,
  getAllGears,
  getSingleGear,
  getMyGears,
  updateGear,
  deleteGear,
};