import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { rentalService } from "./rental.service";
const createRental = catchAsync(async (req, res) => {
    const rental = await rentalService.createRentalIntoDB(req.user.id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Rental order placed successfully",
        data: rental,
    });
});
const getMyRentals = catchAsync(async (req, res) => {
    const result = await rentalService.getMyRentalsFromDB(req.user.id, req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My rentals retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
});
const getSingleRental = catchAsync(async (req, res) => {
    const rental = await rentalService.getSingleRentalFromDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental retrieved successfully",
        data: rental,
    });
});
const getProviderRentalRequests = catchAsync(async (req, res) => {
    const rentals = await rentalService.getProviderRentalRequestsFromDB(req.user.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully",
        data: rentals,
    });
});
const getAllRentals = catchAsync(async (req, res) => {
    const result = await rentalService.getAllRentalsFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rentals retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
});
const confirmRental = catchAsync(async (req, res) => {
    const rental = await rentalService.confirmRentalIntoDB(req.params.id, req.user.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental confirmed successfully",
        data: rental,
    });
});
const pickupRental = catchAsync(async (req, res) => {
    const rental = await rentalService.pickupRentalIntoDB(req.params.id, req.user.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental picked up successfully",
        data: rental,
    });
});
const returnRental = catchAsync(async (req, res) => {
    const rental = await rentalService.returnRentalIntoDB(req.params.id, req.user.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental returned successfully",
        data: rental,
    });
});
const cancelRental = catchAsync(async (req, res) => {
    const rental = await rentalService.cancelRentalIntoDB(req.params.id, req.user.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental cancelled successfully",
        data: rental,
    });
});
const getProviderOrders = catchAsync(async (req, res) => {
    const result = await rentalService.getProviderOrdersFromDB(req.user.id, req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Provider rentals retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
});
const confirmOrder = catchAsync(async (req, res) => {
    const result = await rentalService.confirmOrderIntoDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Order confirmed successfully",
        data: result,
    });
});
const cancelOrder = catchAsync(async (req, res) => {
    const result = await rentalService.cancelOrderIntoDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Order cancelled successfully",
        data: result,
    });
});
const markPickedUp = catchAsync(async (req, res) => {
    const result = await rentalService.markPickedUpIntoDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Gear handed over successfully",
        data: result,
    });
});
const markReturned = catchAsync(async (req, res) => {
    const result = await rentalService.markReturnedIntoDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Gear returned successfully",
        data: result,
    });
});
export const rentalController = {
    createRental,
    getMyRentals,
    getSingleRental,
    getProviderRentalRequests,
    getAllRentals,
    confirmRental,
    pickupRental,
    returnRental,
    cancelRental,
    getProviderOrders,
    confirmOrder,
    cancelOrder,
    markPickedUp,
    markReturned,
};
//# sourceMappingURL=rental.controller.js.map