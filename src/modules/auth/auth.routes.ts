import { Router } from "express";
import { authController } from "./auth.controller";
import { googleAuthController } from "./googleAuth.controller";
// import { Role } from "../../../generated/prisma";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { changePasswordSchema, forgotPasswordSchema, loginSchema } from "../../validations/auth.validation";

const router = Router();

router.post("/login", validate(loginSchema), authController.loginUser);

router.get("/google", googleAuthController.redirectToGoogle);

router.get("/google/callback", googleAuthController.googleCallback);

router.post(
  "/refresh-token",
  authController.refreshToken
);

router.post(
  "/logout",
  authController.logout
);

router.patch(
  "/change-password",
  auth(
    Role.ADMIN,
    Role.CUSTOMER,
    Role.PROVIDER
  ),
  validate(changePasswordSchema),
  authController.changePassword
);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPassword
);

export const authRoutes = router;