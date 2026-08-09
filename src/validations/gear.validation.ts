import { z } from "zod";

export const createGearSchema = z.object({
  name: z
    .string({ message: "Gear name is required" })
    .min(2, "Gear name must be at least 2 characters")
    .max(100, "Gear name must be at most 100 characters"),
  description: z
    .string({ message: "Description is required" })
    .min(10, "Description must be at least 10 characters"),
  brand: z.string({ message: "Brand is required" }).min(1, "Brand is required"),
  image: z.string().url("Image must be a valid URL").optional(),
  pricePerDay: z
    .number({ message: "Price per day is required" })
    .positive("Price per day must be positive"),
  stock: z
    .number({ message: "Stock is required" })
    .int("Stock must be a whole number")
    .nonnegative("Stock cannot be negative"),
  categoryId: z.string({ message: "Category is required" }).min(1, "Category is required"),
});

export const updateGearSchema = createGearSchema.partial();
