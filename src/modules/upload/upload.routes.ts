import { Router } from "express";
import multer from "multer";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { uploadController } from "./upload.controller";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
});

const router = Router();

router.post(
  "/image",
  auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER),
  upload.single("image"),
  uploadController.uploadImage,
);

export const uploadRoutes = router;
