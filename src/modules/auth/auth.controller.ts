import { Request, Response, CookieOptions } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authService } from "./auth.service";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

const loginUser = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const { accessToken, refreshToken } =
      await authService.loginUser(payload);

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
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
      req.cookies.refreshToken ||
      req.body?.refreshToken;

    const result =
      await authService.refreshToken(
        token
      );

    res.cookie("accessToken", result.accessToken, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie("refreshToken", token, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

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
      "accessToken",
      cookieOptions
    );

    res.clearCookie(
      "refreshToken",
      cookieOptions
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

const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.forgotPassword(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result.message,
      data: null,
    });
  }
);

export const authController = {
  loginUser,
  refreshToken,
  logout,
  changePassword,
  forgotPassword,
};
