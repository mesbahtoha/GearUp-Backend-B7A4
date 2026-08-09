import { Router } from "express";

import { auth } from "../../middlewares/auth";

import { Role } from "../../../generated/prisma/enums";

import { reviewController } from "./review.controller";
import { validate } from "../../middlewares/validate";
import { createReviewSchema, updateReviewSchema } from "../../validations/review.validation";

const router = Router();

router.post(
  "/",
  auth(Role.CUSTOMER),
  validate(createReviewSchema),
  reviewController.createReview
);

router.get(
  "/my-reviews",
  auth(Role.CUSTOMER),
  reviewController.getMyReviews
);

router.get(
  "/provider-reviews",
  auth(Role.PROVIDER),
  reviewController.getProviderReviews
);

router.get(
  "/all",
  auth(Role.ADMIN),
  reviewController.getAllReviews
);

router.get(
  "/gear/:gearId",
  reviewController.getGearReviews
);

router.patch(
  "/:id",
  auth(Role.CUSTOMER),
  validate(updateReviewSchema),
  reviewController.updateReview
);

router.delete(
  "/:id",
  auth(Role.CUSTOMER, Role.ADMIN),
  reviewController.deleteReview
);

export const reviewRoutes =
  router;