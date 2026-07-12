import { prisma } from "../../lib/prisma";
import {
  ICreateGear,
  IUpdateGear,
} from "./gear.interface";

const createGearIntoDB = async (
  providerId: string,
  payload: ICreateGear
) => {
  const category =
    await prisma.category.findUnique({
      where: {
        id: payload.categoryId,
      },
    });

  if (!category) {
    throw new Error(
      "Category not found"
    );
  }

  const gear =
    await prisma.gearItem.create({
      data: {
        ...payload,
        providerId,
      },

      include: {
        category: true,
      },
    });

  return gear;
};

const getAllGearsFromDB = async () => {
  const gears =
    await prisma.gearItem.findMany({
      include: {
        category: true,
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return gears;
};

const getSingleGearFromDB = async (
  gearId: string
) => {
  const gear =
    await prisma.gearItem.findUniqueOrThrow({
      where: {
        id: gearId,
      },

      include: {
        category: true,
        provider: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

  return gear;
};

const getMyGearsFromDB = async (
  providerId: string
) => {
  const gears =
    await prisma.gearItem.findMany({
      where: {
        providerId,
      },

      include: {
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return gears;
};

const updateGearIntoDB = async (
  gearId: string,
  providerId: string,
  payload: IUpdateGear
) => {
  const gear =
    await prisma.gearItem.findUniqueOrThrow({
      where: {
        id: gearId,
      },
    });

  if (
    gear.providerId !== providerId
  ) {
    throw new Error(
      "You can update only your own gear"
    );
  }

  const updatedGear =
    await prisma.gearItem.update({
      where: {
        id: gearId,
      },

      data: payload,
    });

  return updatedGear;
};

const deleteGearFromDB = async (
  gearId: string,
  providerId: string
) => {
  const gear =
    await prisma.gearItem.findUniqueOrThrow({
      where: {
        id: gearId,
      },
    });

  if (
    gear.providerId !== providerId
  ) {
    throw new Error(
      "You can delete only your own gear"
    );
  }

  await prisma.gearItem.delete({
    where: {
      id: gearId,
    },
  });

  return null;
};

export const gearService = {
  createGearIntoDB,
  getAllGearsFromDB,
  getSingleGearFromDB,
  getMyGearsFromDB,
  updateGearIntoDB,
  deleteGearFromDB,
};