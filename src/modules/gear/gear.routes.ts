import { Router } from "express";

import { auth } from "../../middlewares/auth";

import { Role } from "../../../generated/prisma/enums";

import { gearController } from "./gear.controller";
import { validate } from "../../middlewares/validate";
import { createGearSchema, updateGearSchema } from "../../validations/gear.validation";

const router = Router();

router.get(
  "/",
  gearController.getAllGears
);

router.get(
  "/my-gears",
  auth(Role.PROVIDER),
  gearController.getMyGears
);

router.get(
  "/:id",
  gearController.getSingleGear
);

router.post(
  "/",
  auth(Role.PROVIDER),
  validate(createGearSchema),
  gearController.createGear
);

router.patch(
  "/:id",
  auth(Role.PROVIDER),
  validate(updateGearSchema),
  gearController.updateGear
);

router.delete(
  "/:id",
  auth(Role.PROVIDER),
  gearController.deleteGear
);

export const gearRoutes = router;