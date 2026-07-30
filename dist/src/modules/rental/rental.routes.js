// import { Router } from "express";
// import { auth } from "../../middlewares/auth";
// import { Role } from "../../../generated/prisma/enums";
// import { rentalController } from "./rental.controller";
// const router = Router();
// router.post(
//   "/",
//   auth(Role.CUSTOMER),
//   rentalController.createRental
// );
// router.get(
//   "/my-rentals",
//   auth(Role.CUSTOMER),
//   rentalController.getMyRentals
// );
// router.get(
//   "/provider-rentals",
//   auth(Role.PROVIDER),
//   rentalController.getProviderRentalRequests
// );
// router.get(
//   "/all",
//   auth(Role.ADMIN),
//   rentalController.getAllRentals
// );
// router.get(
//   "/:id",
//   auth(
//     Role.ADMIN,
//     Role.CUSTOMER,
//     Role.PROVIDER
//   ),
//   rentalController.getSingleRental
// );
// router.patch(
//   "/:id/confirm",
//   auth(Role.PROVIDER),
//   rentalController.confirmRental
// );
// router.patch(
//   "/:id/pick-up",
//   auth(Role.PROVIDER),
//   rentalController.pickupRental
// );
// router.patch(
//   "/:id/return",
//   auth(Role.PROVIDER),
//   rentalController.returnRental
// );
// router.patch(
//   "/:id/cancel",
//   auth(Role.CUSTOMER),
//   rentalController.cancelRental
// );
// router.get(
//   "/provider-orders",
//   auth(Role.PROVIDER),
//   rentalController.getProviderOrders
// );
// router.patch(
//   "/:id/confirm",
//   auth(Role.PROVIDER),
//   rentalController.confirmOrder
// );
// router.patch(
//   "/:id/cancel",
//   auth(Role.PROVIDER),
//   rentalController.cancelOrder
// );
// router.patch(
//   "/:id/pickup",
//   auth(Role.PROVIDER),
//   rentalController.markPickedUp
// );
// router.patch(
//   "/:id/return",
//   auth(Role.PROVIDER),
//   rentalController.markReturned
// );
// export const rentalRoutes = router;
import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalController } from "./rental.controller";
const router = Router();
router.post("/", auth(Role.CUSTOMER), rentalController.createRental);
router.get("/my-rentals", auth(Role.CUSTOMER), rentalController.getMyRentals);
router.get("/provider-orders", auth(Role.PROVIDER), rentalController.getProviderOrders);
router.get("/all", auth(Role.ADMIN), rentalController.getAllRentals);
router.patch("/:id/confirm", auth(Role.PROVIDER), rentalController.confirmOrder);
router.patch("/:id/pickup", auth(Role.PROVIDER), rentalController.markPickedUp);
router.patch("/:id/return", auth(Role.PROVIDER), rentalController.markReturned);
router.patch("/:id/cancel", auth(Role.CUSTOMER, Role.PROVIDER), rentalController.cancelOrder);
router.get("/:id", auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER), rentalController.getSingleRental);
export const rentalRoutes = router;
//# sourceMappingURL=rental.routes.js.map