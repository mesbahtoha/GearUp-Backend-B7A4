import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
<<<<<<< HEAD
import { uploadToImgBB } from "../../utils/uploadImage";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status-codes";
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
import { RegisterUserPayload, UpdateProfilePayload } from "./user.interface";

const registerUserIntoDB = async (payload: RegisterUserPayload) => {
  const { name, email, password, phone, role } = payload;

  if (!name?.trim()) {
<<<<<<< HEAD
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
=======
    throw new Error("Name is required");
  }

  if (!email?.trim()) {
    throw new Error("Email is required");
  }

  if (!password?.trim()) {
    throw new Error("Password is required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
<<<<<<< HEAD
    throw new AppError(httpStatus.CONFLICT, "User with this email already exists!");
=======
    throw new Error("User with this email already exists!");
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
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
<<<<<<< HEAD
    throw new AppError(httpStatus.BAD_REQUEST, "Name cannot be empty");
  }

  const data: Record<string, string | undefined> = {};
  if (payload.name !== undefined) data.name = payload.name;
  if (payload.phone !== undefined) data.phone = payload.phone;
  if (payload.image !== undefined) data.image = payload.image;

=======
    throw new Error("Name cannot be empty");
  }

>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
<<<<<<< HEAD
    data,
=======
    data: {
      name: payload.name,
      phone: payload.phone,
    },
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    omit: {
      password: true,
    },
  });

  return updatedUser;
};

<<<<<<< HEAD
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

=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
export const userService = {
  registerUserIntoDB,
  getMyProfileFromDB,
  updateMyProfileInDB,
<<<<<<< HEAD
  updateProfileImageInDB,
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
};
