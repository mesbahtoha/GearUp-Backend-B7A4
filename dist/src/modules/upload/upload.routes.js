import { Router } from "express";
import multer from "multer";
import { uploadController } from "./upload.controller";
const upload = multer({ storage: multer.memoryStorage() });
const router = Router();
router.post("/image", upload.single("image"), uploadController.uploadImage);
export const uploadRoutes = router;
//# sourceMappingURL=upload.routes.js.map