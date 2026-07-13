import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { dashboardService } from "./dashboard.service";

const providerDashboard =
  catchAsync(async (req, res) => {

    const result =
      await dashboardService.getProviderDashboardFromDB(
        req.user!.id
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "Provider dashboard retrieved successfully",
      data: result,
    });
  });

const customerDashboard =
  catchAsync(async (req, res) => {

    const result =
      await dashboardService.getCustomerDashboardFromDB(
        req.user!.id
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message:
        "Customer dashboard retrieved successfully",
      data: result,
    });
  });

export const dashboardController = {
  providerDashboard,
  customerDashboard,
};