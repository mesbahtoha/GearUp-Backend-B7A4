import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { adminService } from "./admin.service";

const getAllUsers =
  catchAsync(async (req, res) => {

    const result =
      await adminService.getAllUsersFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
      data: result,
    });
  });

const getSingleUser =
  catchAsync(async (req, res) => {

    const result =
      await adminService.getSingleUserFromDB(
        req.params.id as string
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved successfully",
      data: result,
    });
  });

const suspendUser =
  catchAsync(async (req, res) => {

    const result =
      await adminService.suspendUserIntoDB(
        req.params.id as string
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User suspended successfully",
      data: result,
    });
  });

const activateUser =
  catchAsync(async (req, res) => {

    const result =
      await adminService.activateUserIntoDB(
        req.params.id as string
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User activated successfully",
      data: result,
    });
  });

const getAllRentals =
  catchAsync(async (req, res) => {

    const result =
      await adminService.getAllRentalsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rentals retrieved successfully",
      data: result,
    });
  });

const getAllPayments =
  catchAsync(async (req, res) => {

    const result =
      await adminService.getAllPaymentsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payments retrieved successfully",
      data: result,
    });
  });

const getDashboardStats =
  catchAsync(async (req, res) => {

    const result =
      await adminService.getDashboardStatsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Dashboard statistics retrieved successfully",
      data: result,
    });
  });

const deleteGear =
  catchAsync(async (req, res) => {

    await adminService.deleteGearFromDB(
      req.params.id as string
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear deleted successfully",
      data: null,
    });
  });

export const adminController = {
  getAllUsers,
  getSingleUser,
  suspendUser,
  activateUser,
  getAllRentals,
  getAllPayments,
  getDashboardStats,
  deleteGear,
};