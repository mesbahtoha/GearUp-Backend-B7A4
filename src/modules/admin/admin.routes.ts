import { Router } from "express";

import { auth } from "../../middlewares/auth";

import { Role } from "../../../generated/prisma/enums";

import { adminController } from "./admin.controller";

const router = Router();

router.get(
  "/users",
  auth(Role.ADMIN),
  adminController.getAllUsers
);

router.get(
  "/users/:id",
  auth(Role.ADMIN),
  adminController.getSingleUser
);

router.patch(
  "/users/:id/suspend",
  auth(Role.ADMIN),
  adminController.suspendUser
);

router.patch(
  "/users/:id/activate",
  auth(Role.ADMIN),
  adminController.activateUser
);

router.get(
  "/rentals",
  auth(Role.ADMIN),
  adminController.getAllRentals
);

router.get(
  "/payments",
  auth(Role.ADMIN),
  adminController.getAllPayments
);

router.get(
  "/dashboard",
  auth(Role.ADMIN),
  adminController.getDashboardStats
);

router.delete(
  "/gears/:id",
  auth(Role.ADMIN),
  adminController.deleteGear
);

router.patch(
  "/users/:id/role",
  auth(Role.ADMIN),
  adminController.changeUserRole
);

export const adminRoutes = router;