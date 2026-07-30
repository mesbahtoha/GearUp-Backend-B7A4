import { Router } from "express";
<<<<<<< HEAD
import multer from "multer";
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
import { Role } from "../../../generated/prisma/enums";

import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";

<<<<<<< HEAD
const upload = multer({ storage: multer.memoryStorage() });

=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
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

<<<<<<< HEAD
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

=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
export const userRoutes = router;