import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

const loginUser = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const { accessToken, refreshToken } =
      await authService.loginUser(payload);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully!",
      data: {
        accessToken,
        refreshToken,
      },
    });
  }
);

const refreshToken = catchAsync(
  async (req, res) => {

    const token =
      req.cookies.refreshToken;

    const result =
      await authService.refreshToken(
        token
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "Access token generated successfully",
      data: result,
    });
  }
);

const logout = catchAsync(
  async (req, res) => {

    res.clearCookie(
      "accessToken"
    );

    res.clearCookie(
      "refreshToken"
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "Logout successful",
      data: null,
    });
  }
);

const changePassword =
  catchAsync(
    async (req, res) => {

      await authService.changePassword(
        req.user!.id,
        req.body
      );

      sendResponse(res, {
        success: true,
        statusCode:
          httpStatus.OK,
        message:
          "Password changed successfully",
        data: null,
      });
    }
  );

export const authController = {
  loginUser,
  refreshToken,
  logout,
  changePassword
};