import { Router } from "express";

import { auth } from "../../middlewares/auth";

import { Role } from "../../../generated/prisma/enums";

import { categoryController } from "./category.controller";
import { validate } from "../../middlewares/validate";
import { createCategorySchema, updateCategorySchema } from "../../validations/category.validation";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN),
  validate(createCategorySchema),
  categoryController.createCategory
);

router.get(
  "/",
  categoryController.getAllCategories
);

router.get(
  "/:id",
  categoryController.getSingleCategory
);

router.patch(
  "/:id",
  auth(Role.ADMIN),
  validate(updateCategorySchema),
  categoryController.updateCategory
);

router.delete(
  "/:id",
  auth(Role.ADMIN),
  categoryController.deleteCategory
);

export const categoryRoutes = router;