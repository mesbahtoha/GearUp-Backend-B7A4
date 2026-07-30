import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { uploadToImgBB } from "../../utils/uploadImage";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status-codes";
import { RegisterUserPayload, UpdateProfilePayload } from "./user.interface";

const registerUserIntoDB = async (payload: RegisterUserPayload) => {
  const { name, email, password, phone, role } = payload;

  if (!name?.trim()) {
    throw new AppError(httpStatus.BAD_REQUEST, "Name is required");
  }

  if (!email?.trim()) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
  }

  if (!password?.trim()) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is required");
  }

  if (password.length < 6) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password must be at least 6 characters");
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new AppError(httpStatus.CONFLICT, "User with this email already exists!");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "CUSTOMER",
    },
    omit: {
      password: true,
    },
  });

  return user;
};

const getMyProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

const updateMyProfileInDB = async (
  userId: string,
  payload: UpdateProfilePayload,
) => {
  if (payload.name !== undefined && !payload.name.trim()) {
    throw new AppError(httpStatus.BAD_REQUEST, "Name cannot be empty");
  }

  const data: Record<string, string | undefined> = {};
  if (payload.name !== undefined) data.name = payload.name;
  if (payload.phone !== undefined) data.phone = payload.phone;
  if (payload.image !== undefined) data.image = payload.image;

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
    omit: {
      password: true,
    },
  });

  return updatedUser;
};

const updateProfileImageInDB = async (
  userId: string,
  buffer: Buffer,
  mimetype: string,
) => {
  const url = await uploadToImgBB(buffer, mimetype);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { image: url },
    omit: { password: true },
  });

  return updatedUser;
};

export const userService = {
  registerUserIntoDB,
  getMyProfileFromDB,
  updateMyProfileInDB,
  updateProfileImageInDB,
};
