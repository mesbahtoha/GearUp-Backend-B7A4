import { prisma } from "../../lib/prisma";
import { RentalStatus } from "../../../generated/prisma/enums";
import { ICreateRental } from "./rental.interface";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status-codes";

const createRentalIntoDB = async (
  customerId: string,
  payload: ICreateRental,
) => {
  if (!payload.gearId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Gear ID is required");
  }

  if (!payload.startDate) {
    throw new AppError(httpStatus.BAD_REQUEST, "Start date is required");
  }

  if (!payload.endDate) {
    throw new AppError(httpStatus.BAD_REQUEST, "End date is required");
  }

  if (!payload.quantity || payload.quantity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Quantity must be greater than 0");
  }

  const gear = await prisma.gearItem.findUnique({
    where: {
      id: payload.gearId,
    },
  });

  if (!gear) {
    throw new AppError(httpStatus.NOT_FOUND, "Gear not found");
  }

  if (!gear.isAvailable) {
    throw new AppError(httpStatus.BAD_REQUEST, "Gear is not available");
  }

  if (payload.quantity > gear.stock) {
    throw new AppError(httpStatus.BAD_REQUEST, "Insufficient stock");
  }

  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);

  if (startDate >= endDate) {
    throw new AppError(httpStatus.BAD_REQUEST, "End date must be after start date");
  }

  const days =
    Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    ) || 1;

  const totalPrice = gear.pricePerDay * payload.quantity * days;

  const rental = await prisma.rentalOrder.create({
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

const getMyRentalsFromDB = async (customerId: string, query: any) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const where: any = {
    customerId,
  };

  if (query.status) {
    where.status = query.status;
  }

  const rentals = await prisma.rentalOrder.findMany({
    where,

    include: {
      gear: true,
      payment: true,
    },

    skip,
    take: limit,

    orderBy: {
      [query.sortBy || "createdAt"]: query.sortOrder || "desc",
    },
  });

  const total = await prisma.rentalOrder.count({
    where,
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: rentals,
  };
};

const getSingleRentalFromDB = async (
  rentalId: string,
  userId: string,
  userRole: string,
) => {
  const rental = await prisma.rentalOrder.findUniqueOrThrow({
    where: {
      id: rentalId,
    },

    include: {
      gear: true,
      payment: true,
    },
  });

  const isOwner = rental.customerId === userId;
  const isProvider = rental.gear.providerId === userId;

  if (userRole !== "ADMIN" && !isOwner && !isProvider) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to view this rental",
    );
  }

  return rental;
};

const getProviderRentalRequestsFromDB = async (providerId: string) => {
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

const getAllRentalsFromDB = async (query: any) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const where: any = {};

  if (query.status) {
    where.status = query.status;
  }

  const rentals = await prisma.rentalOrder.findMany({
    where,

    include: {
      customer: true,
      gear: true,
      payment: true,
    },

    skip,
    take: limit,

    orderBy: {
      [query.sortBy || "createdAt"]: query.sortOrder || "desc",
    },
  });

  const total = await prisma.rentalOrder.count({
    where,
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },

    data: rentals,
  };
};

const confirmRentalIntoDB = async (rentalId: string, providerId: string) => {
  const rental = await prisma.rentalOrder.findUniqueOrThrow({
    where: {
      id: rentalId,
    },

    include: {
      gear: true,
    },
  });

  if (rental.gear.providerId !== providerId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not owner of this gear");
  }

  if (rental.status !== RentalStatus.PLACED) {
    throw new AppError(httpStatus.BAD_REQUEST, "Only placed orders can be confirmed");
  }

  return prisma.rentalOrder.update({
    where: {
      id: rentalId,
    },

    data: {
      status: RentalStatus.CONFIRMED,
    },
  });
};

const pickupRentalIntoDB = async (rentalId: string, providerId: string) => {
  const rental = await prisma.rentalOrder.findUniqueOrThrow({
    where: {
      id: rentalId,
    },

    include: {
      gear: true,
    },
  });

  if (rental.gear.providerId !== providerId) {
    throw new AppError(httpStatus.FORBIDDEN, "Unauthorized");
  }

  if (rental.status !== RentalStatus.PAID) {
    throw new AppError(httpStatus.BAD_REQUEST, "Rental must be paid first");
  }

  return prisma.rentalOrder.update({
    where: {
      id: rentalId,
    },

    data: {
      status: RentalStatus.PICKED_UP,
    },
  });
};

const returnRentalIntoDB = async (rentalId: string, providerId: string) => {
  const rental = await prisma.rentalOrder.findUniqueOrThrow({
    where: {
      id: rentalId,
    },

    include: {
      gear: true,
    },
  });

  if (rental.gear.providerId !== providerId) {
    throw new AppError(httpStatus.FORBIDDEN, "Unauthorized");
  }

  if (rental.status !== RentalStatus.PICKED_UP) {
    throw new AppError(httpStatus.BAD_REQUEST, "Rental not picked up yet");
  }

  return prisma.rentalOrder.update({
    where: {
      id: rentalId,
    },

    data: {
      status: RentalStatus.RETURNED,
    },
  });
};

const cancelRentalIntoDB = async (rentalId: string, customerId: string) => {
  const rental = await prisma.rentalOrder.findUniqueOrThrow({
    where: {
      id: rentalId,
    },
  });

  if (rental.customerId !== customerId) {
    throw new AppError(httpStatus.FORBIDDEN, "Unauthorized");
  }

  if (rental.status !== RentalStatus.PLACED) {
    throw new AppError(httpStatus.BAD_REQUEST, "Only placed rental can be cancelled");
  }

  return prisma.rentalOrder.update({
    where: {
      id: rentalId,
    },

    data: {
      status: RentalStatus.CANCELLED,
    },
  });
};

const getProviderOrdersFromDB = async (providerId: string, query: any) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const where: any = {
    gear: {
      providerId,
    },
  };

  if (query.status) {
    where.status = query.status;
  }

  const rentals = await prisma.rentalOrder.findMany({
    where,

    include: {
      customer: {
        omit: {
          password: true,
        },
      },

      gear: true,
      payment: true,
    },

    skip,
    take: limit,

    orderBy: {
      [query.sortBy || "createdAt"]: query.sortOrder || "desc",
    },
  });

  const total = await prisma.rentalOrder.count({
    where,
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },

    data: rentals,
  };
};

const cancelOrderByProviderIntoDB = async (rentalId: string, providerId: string) => {
  const rental = await prisma.rentalOrder.findUniqueOrThrow({
    where: {
      id: rentalId,
    },

    include: {
      gear: true,
    },
  });

  if (rental.gear.providerId !== providerId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not owner of this gear");
  }

  if (
    rental.status === "PAID" ||
    rental.status === "PICKED_UP" ||
    rental.status === "RETURNED"
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Order cannot be cancelled");
  }

  return prisma.rentalOrder.update({
    where: {
      id: rentalId,
    },
    data: {
      status: "CANCELLED",
    },
  });
};

export const rentalService = {
  createRentalIntoDB,
  getMyRentalsFromDB,
  getSingleRentalFromDB,
  getProviderRentalRequestsFromDB,
  getAllRentalsFromDB,
  confirmRentalIntoDB,
  pickupRentalIntoDB,
  returnRentalIntoDB,
  cancelRentalIntoDB,
  getProviderOrdersFromDB,
  cancelOrderByProviderIntoDB,
};
