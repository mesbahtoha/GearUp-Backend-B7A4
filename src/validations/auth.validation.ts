import { z } from "zod";
import { Role } from "../../generated/prisma/enums";

export const registerSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be at most 60 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 characters")
    .or(z.literal(""))
    .optional(),
  role: z.enum([Role.CUSTOMER, Role.PROVIDER]).optional().default(Role.CUSTOMER),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string({ message: "Password is required" }).min(1, "Password is required"),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string({ message: "Old password is required" }).min(1),
    newPassword: z
      .string({ message: "New password is required" })
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => !data.confirmPassword || data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
  oldPassword: z
    .string({ message: "Current password is required" })
    .min(1, "Current password is required"),
  newPassword: z
    .string({ message: "New password is required" })
    .min(6, "New password must be at least 6 characters"),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be at most 60 characters")
    .optional(),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 characters")
    .or(z.literal(""))
    .optional(),
  image: z.string().url("Image must be a valid URL").optional(),
});
