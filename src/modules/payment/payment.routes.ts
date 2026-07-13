import { Router } from "express";

import { auth } from "../../middlewares/auth";

import { Role } from "../../../generated/prisma/enums";

import { paymentController } from "./payment.controller";

const router = Router();

router.post(
  "/checkout/:rentalId",
  auth(Role.CUSTOMER),
  paymentController.createPaymentIntent
);

export const paymentRoutes = router;