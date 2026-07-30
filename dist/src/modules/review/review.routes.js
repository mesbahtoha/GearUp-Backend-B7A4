import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewController } from "./review.controller";
const router = Router();
router.post("/", auth(Role.CUSTOMER), reviewController.createReview);
router.get("/my-reviews", auth(Role.CUSTOMER), reviewController.getMyReviews);
<<<<<<< HEAD
router.get("/provider-reviews", auth(Role.PROVIDER), reviewController.getProviderReviews);
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
router.get("/all", auth(Role.ADMIN), reviewController.getAllReviews);
router.get("/gear/:gearId", reviewController.getGearReviews);
router.patch("/:id", auth(Role.CUSTOMER), reviewController.updateReview);
router.delete("/:id", auth(Role.CUSTOMER), reviewController.deleteReview);
export const reviewRoutes = router;
//# sourceMappingURL=review.routes.js.map