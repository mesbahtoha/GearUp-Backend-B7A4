import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string({ message: "Category name is required" })
    .min(2, "Category name must be at least 2 characters")
    .max(60, "Category name must be at most 60 characters"),
  description: z.string().max(300, "Description must be at most 300 characters").optional(),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(60, "Category name must be at most 60 characters")
    .optional(),
  description: z.string().max(300, "Description must be at most 300 characters").optional(),
});
