import httpStatus from "http-status";
import { uploadToImgBB } from "../../utils/uploadImage";
import { sendResponse } from "../../utils/sendResponse";
const uploadImage = async (req, res) => {
    if (!req.file) {
        res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: "No image file provided",
        });
        return;
    }
    const MAX_SIZE = 2 * 1024 * 1024;
    if (req.file.size > MAX_SIZE) {
        res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: "Image must be under 2MB",
        });
        return;
    }
    const url = await uploadToImgBB(req.file.buffer, req.file.mimetype);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Image uploaded successfully!",
        data: { image: url },
    });
};
export const uploadController = {
    uploadImage,
};
//# sourceMappingURL=upload.controller.js.map