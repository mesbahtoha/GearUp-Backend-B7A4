import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { adminService } from "./admin.service";
const getAllUsers = catchAsync(async (req, res) => {
    const result = await adminService.getAllUsersFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Users retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
});
const getSingleUser = catchAsync(async (req, res) => {
    const result = await adminService.getSingleUserFromDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User retrieved successfully",
        data: result,
    });
});
const suspendUser = catchAsync(async (req, res) => {
    const result = await adminService.suspendUserIntoDB(req.user.id, req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User suspended successfully",
        data: result,
    });
});
const activateUser = catchAsync(async (req, res) => {
    const result = await adminService.activateUserIntoDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User activated successfully",
        data: result,
    });
});
const getAllRentals = catchAsync(async (req, res) => {
    const result = await adminService.getAllRentalsFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rentals retrieved successfully",
<<<<<<< HEAD
        data: result.data,
        meta: result.meta,
=======
        data: result,
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    });
});
const getAllPayments = catchAsync(async (req, res) => {
    const result = await adminService.getAllPaymentsFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payments retrieved successfully",
<<<<<<< HEAD
        data: result.data,
        meta: result.meta,
=======
        data: result,
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    });
});
const getDashboardStats = catchAsync(async (req, res) => {
    const result = await adminService.getDashboardStatsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Dashboard statistics retrieved successfully",
        data: result,
    });
});
const deleteGear = catchAsync(async (req, res) => {
    await adminService.deleteGearFromDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Gear deleted successfully",
        data: null,
    });
});
<<<<<<< HEAD
const toggleGearAvailability = catchAsync(async (req, res) => {
    const result = await adminService.toggleGearAvailabilityIntoDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: `Gear ${result.isAvailable ? "activated" : "inactivated"} successfully`,
        data: result,
    });
});
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
const changeUserRole = catchAsync(async (req, res) => {
    const result = await adminService.changeUserRoleIntoDB(req.params.id, req.body.role);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User role updated successfully",
        data: result,
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
<<<<<<< HEAD
    toggleGearAvailability,
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    changeUserRole,
};
//# sourceMappingURL=admin.controller.js.map