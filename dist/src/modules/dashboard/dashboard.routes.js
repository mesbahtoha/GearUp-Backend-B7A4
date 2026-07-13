import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { dashboardController } from "./dashboard.controller";
const router = Router();
router.get("/provider", auth(Role.PROVIDER), dashboardController.providerDashboard);
router.get("/customer", auth(Role.CUSTOMER), dashboardController.customerDashboard);
export const dashboardRoutes = router;
//# sourceMappingURL=dashboard.routes.js.map