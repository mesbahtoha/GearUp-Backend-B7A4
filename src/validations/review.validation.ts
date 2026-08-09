import { z } from "zod";

export const createReviewSchema = z.object({
  gearId: z.string({ message: "Gear ID is required" }).min(1, "Gear ID is required"),
  rating: z
    .number({ message: "Rating is required" })
    .int("Rating must be a whole number")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z.string().max(500, "Comment must be at most 500 characters").optional(),
});

export const updateReviewSchema = z
  .object({
    rating: z
      .number()
      .int("Rating must be a whole number")
      .min(1, "Rating must be between 1 and 5")
      .max(5, "Rating must be between 1 and 5")
      .optional(),
    comment: z.string().max(500, "Comment must be at most 500 characters").optional(),
  })
  .refine((data) => data.rating !== undefined || data.comment !== undefined, {
    message: "Provide at least one field to update",
  });
