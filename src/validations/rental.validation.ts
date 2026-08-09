import { z } from "zod";

export const createRentalSchema = z.object({
  gearId: z.string({ message: "Gear ID is required" }).min(1, "Gear ID is required"),
  startDate: z.string({ message: "Start date is required" }).min(1, "Start date is required"),
  endDate: z.string({ message: "End date is required" }).min(1, "End date is required"),
  quantity: z
    .number({ message: "Quantity is required" })
    .int("Quantity must be a whole number")
    .positive("Quantity must be greater than 0"),
});
