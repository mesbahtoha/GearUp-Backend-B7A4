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
    const result = await reviewService.getMyReviewsFromDB(req.user.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My reviews retrieved successfully",
        data: result,
    });
});
const getGearReviews = catchAsync(async (req, res) => {
    const result = await reviewService.getGearReviewsFromDB(req.params.gearId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear reviews retrieved successfully",
        data: result,
    });
});
const getAllReviews = catchAsync(async (req, res) => {
    const result = await reviewService.getAllReviewsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All reviews retrieved successfully",
        data: result,
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
    getAllReviews,
    updateReview,
    deleteReview,
};
//# sourceMappingURL=review.controller.js.map