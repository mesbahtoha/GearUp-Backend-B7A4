import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const registerUser = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const user =
      await userService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully!",
      data: user,
    });
  }
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response) => {
    const profile =
      await userService.getMyProfileFromDB(
        req.user!.id
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile fetched successfully!",
      data: profile,
    });
  }
);

const updateMyProfile = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const updatedProfile =
      await userService.updateMyProfileInDB(
        userId,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile updated successfully!",
      data: updatedProfile,
    });
  }
);

const updateProfileImage = catchAsync(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new Error("No image file provided");
    }

    const MAX_SIZE = 2 * 1024 * 1024;
    if (req.file.size > MAX_SIZE) {
      throw new Error("Image must be under 2MB");
    }

    const updatedProfile = await userService.updateProfileImageInDB(
      req.user!.id,
      req.file.buffer,
      req.file.mimetype,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile image updated successfully!",
      data: updatedProfile,
    });
  }
);

export const userController = {
  registerUser,
  getMyProfile,
  updateMyProfile,
  updateProfileImage,
};
