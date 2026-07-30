import { Router } from "express";
import multer from "multer";
import { Role } from "../../../generated/prisma/enums";

import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post(
  "/register",
  userController.registerUser
);

router.get(
  "/me",
  auth(
    Role.ADMIN,
    Role.CUSTOMER,
    Role.PROVIDER
  ),
  userController.getMyProfile
);

router.put(
  "/my-profile",
  auth(
    Role.ADMIN,
    Role.CUSTOMER,
    Role.PROVIDER
  ),
  userController.updateMyProfile
);

router.post(
  "/upload-image",
  auth(
    Role.ADMIN,
    Role.CUSTOMER,
    Role.PROVIDER
  ),
  upload.single("image"),
  userController.updateProfileImage
);

export const userRoutes = router;