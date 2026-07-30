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
<<<<<<< HEAD
    const result = await reviewService.getMyReviewsFromDB(req.user.id, req.query);
=======
    const result = await reviewService.getMyReviewsFromDB(req.user.id);
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My reviews retrieved successfully",
<<<<<<< HEAD
        data: result.data,
        meta: result.meta,
    });
});
const getGearReviews = catchAsync(async (req, res) => {
    const result = await reviewService.getGearReviewsFromDB(req.params.gearId, req.query);
=======
        data: result,
    });
});
const getGearReviews = catchAsync(async (req, res) => {
    const result = await reviewService.getGearReviewsFromDB(req.params.gearId);
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear reviews retrieved successfully",
<<<<<<< HEAD
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
=======
        data: result,
    });
});
const getAllReviews = catchAsync(async (req, res) => {
    const result = await reviewService.getAllReviewsFromDB();
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All reviews retrieved successfully",
<<<<<<< HEAD
        data: result.data,
        meta: result.meta,
=======
        data: result,
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
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
<<<<<<< HEAD
    getProviderReviews,
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    getAllReviews,
    updateReview,
    deleteReview,
};
//# sourceMappingURL=review.controller.js.map