import { prisma } from "../../lib/prisma";
import { RentalStatus } from "../../../generated/prisma/enums";
import { ICreateRental } from "./rental.interface";

const createRentalIntoDB = async (
  customerId: string,
  payload: ICreateRental
) => {
  const gear = await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: payload.gearId,
    },
  });

  if (!gear.isAvailable) {
    throw new Error("Gear is not available");
  }

  if (payload.quantity > gear.stock) {
    throw new Error("Insufficient stock");
  }

  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);

  const days =
    Math.ceil(
      (endDate.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 1;

  const totalPrice =
    gear.pricePerDay *
    payload.quantity *
    days;

  const rental =
    await prisma.rentalOrder.create({
      data: {
        quantity: payload.quantity,
        startDate,
        endDate,
        totalPrice,
        customerId,
        gearId: gear.id,
      },

      include: {
        gear: true,
      },
    });

  return rental;
};

const getMyRentalsFromDB = async (
  customerId: string
) => {
  return prisma.rentalOrder.findMany({
    where: {
      customerId,
    },

    include: {
      gear: true,
      payment: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSingleRentalFromDB = async (
  rentalId: string
) => {
  return prisma.rentalOrder.findUniqueOrThrow({
    where: {
      id: rentalId,
    },

    include: {
      gear: true,
      payment: true,
    },
  });
};

const getProviderRentalRequestsFromDB =
  async (providerId: string) => {
    return prisma.rentalOrder.findMany({
      where: {
        gear: {
          providerId,
        },
      },

      include: {
        customer: true,
        gear: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };

const getAllRentalsFromDB = async () => {
  return prisma.rentalOrder.findMany({
    include: {
      customer: true,
      gear: true,
      payment: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const rentalService = {
  createRentalIntoDB,
  getMyRentalsFromDB,
  getSingleRentalFromDB,
  getProviderRentalRequestsFromDB,
  getAllRentalsFromDB,
};