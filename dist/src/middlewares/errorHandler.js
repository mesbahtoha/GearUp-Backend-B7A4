import httpStatus from "http-status-codes";
export const globalErrorHandler = (error, req, res, next) => {
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong";
    if (error instanceof Error) {
        message = error.message;
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorDetails: error,
    });
};
//# sourceMappingURL=errorHandler.js.map