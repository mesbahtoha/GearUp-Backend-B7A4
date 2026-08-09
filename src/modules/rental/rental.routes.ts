import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalController } from "./rental.controller";
import { validate } from "../../middlewares/validate";
import { createRentalSchema } from "../../validations/rental.validation";

const router = Router();

router.post(
  "/",
  auth(Role.CUSTOMER),
  validate(createRentalSchema),
  rentalController.createRental
);

router.get(
  "/my-rentals",
  auth(Role.CUSTOMER),
  rentalController.getMyRentals
);

router.get(
  "/provider-orders",
  auth(Role.PROVIDER),
  rentalController.getProviderOrders
);

router.get(
  "/all",
  auth(Role.ADMIN),
  rentalController.getAllRentals
);

router.patch(
  "/:id/confirm",
  auth(Role.PROVIDER),
  rentalController.confirmOrder
);

router.patch(
  "/:id/pickup",
  auth(Role.PROVIDER),
  rentalController.markPickedUp
);

router.patch(
  "/:id/return",
  auth(Role.PROVIDER),
  rentalController.markReturned
);

router.patch(
  "/:id/cancel",
  auth(Role.CUSTOMER, Role.PROVIDER),
  rentalController.cancelOrder
);

router.get(
  "/:id",
  auth(
    Role.ADMIN,
    Role.CUSTOMER,
    Role.PROVIDER
  ),
  rentalController.getSingleRental
);

export const rentalRoutes = router;
