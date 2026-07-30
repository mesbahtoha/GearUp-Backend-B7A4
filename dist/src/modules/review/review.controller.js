import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewService } from "./review.service";
const createReview = catchAsync(async (req, res) => {
    const result = await reviewService.createReviewIntoDB(req.user.id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Review created successfully",
        data: result,
    });
});
const getMyReviews = catchAsync(async (req, res) => {
    const result = await reviewService.getMyReviewsFromDB(req.user.id, req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My reviews retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
});
const getGearReviews = catchAsync(async (req, res) => {
    const result = await reviewService.getGearReviewsFromDB(req.params.gearId, req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear reviews retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
});
const getProviderReviews = catchAsync(async (req, res) => {
    const result = await reviewService.getProviderReviewsFromDB(req.user.id, req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Provider reviews retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
});
const getAllReviews = catchAsync(async (req, res) => {
    const result = await reviewService.getAllReviewsFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All reviews retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
});
const updateReview = catchAsync(async (req, res) => {
    const result = await reviewService.updateReviewIntoDB(req.params.id, req.user.id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Review updated successfully",
        data: result,
    });
});
const deleteReview = catchAsync(async (req, res) => {
    await reviewService.deleteReviewFromDB(req.params.id, req.user.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Review deleted successfully",
        data: null,
    });
});
export const reviewController = {
    createReview,
    getMyReviews,
    getGearReviews,
    getProviderReviews,
    getAllReviews,
    updateReview,
    deleteReview,
};
//# sourceMappingURL=review.controller.js.map