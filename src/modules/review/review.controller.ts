import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { reviewService } from "./review.service";

const createReview =
  catchAsync(async (req, res) => {
    const result =
      await reviewService.createReviewIntoDB(
        req.user!.id,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode:
        httpStatus.CREATED,
      message:
        "Review created successfully",
      data: result,
    });
  });

const getMyReviews =
  catchAsync(async (req, res) => {
    const result =
      await reviewService.getMyReviewsFromDB(
<<<<<<< HEAD
        req.user!.id,
        req.query as { page?: number; limit?: number }
=======
        req.user!.id
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
      );

    sendResponse(res, {
      success: true,
      statusCode:
        httpStatus.OK,
      message:
        "My reviews retrieved successfully",
<<<<<<< HEAD
      data: result.data,
      meta: result.meta,
=======
      data: result,
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    });
  });

const getGearReviews =
  catchAsync(async (req, res) => {
    const result =
      await reviewService.getGearReviewsFromDB(
<<<<<<< HEAD
        req.params.gearId as string,
        req.query as { page?: number; limit?: number }
=======
        req.params.gearId as string
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
      );

    sendResponse(res, {
      success: true,
      statusCode:
        httpStatus.OK,
      message:
        "Gear reviews retrieved successfully",
<<<<<<< HEAD
      data: result.data,
      meta: result.meta,
    });
  });

const getProviderReviews =
  catchAsync(async (req, res) => {
    const result =
      await reviewService.getProviderReviewsFromDB(
        req.user!.id,
        req.query as { page?: number; limit?: number }
      );

    sendResponse(res, {
      success: true,
      statusCode:
        httpStatus.OK,
      message:
        "Provider reviews retrieved successfully",
      data: result.data,
      meta: result.meta,
=======
      data: result,
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    });
  });

const getAllReviews =
  catchAsync(async (req, res) => {
    const result =
<<<<<<< HEAD
      await reviewService.getAllReviewsFromDB(
        req.query as { page?: number; limit?: number }
      );
=======
      await reviewService.getAllReviewsFromDB();
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915

    sendResponse(res, {
      success: true,
      statusCode:
        httpStatus.OK,
      message:
        "All reviews retrieved successfully",
<<<<<<< HEAD
      data: result.data,
      meta: result.meta,
=======
      data: result,
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    });
  });

const updateReview =
  catchAsync(async (req, res) => {
    const result =
      await reviewService.updateReviewIntoDB(
        req.params.id as string,
        req.user!.id,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode:
        httpStatus.OK,
      message:
        "Review updated successfully",
      data: result,
    });
  });

const deleteReview =
  catchAsync(async (req, res) => {
    await reviewService.deleteReviewFromDB(
      req.params.id as string,
      req.user!.id
    );

    sendResponse(res, {
      success: true,
      statusCode:
        httpStatus.OK,
      message:
        "Review deleted successfully",
      data: null,
    });
  });

export const reviewController = {
  createReview,
  getMyReviews,
  getGearReviews,
<<<<<<< HEAD
  getProviderReviews,
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
  getAllReviews,
  updateReview,
  deleteReview,
};