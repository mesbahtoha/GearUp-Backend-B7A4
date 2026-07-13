import { Router } from "express";
import { authController } from "./auth.controller";
import { Role } from "../../../generated/prisma";
import { auth } from "../../middlewares/auth";
const router = Router();
router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.patch("/change-password", auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER), authController.changePassword);
export const authRoutes = router;
//# sourceMappingURL=auth.routes.js.map