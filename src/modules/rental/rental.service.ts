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

const confirmRentalIntoDB = async (
  rentalId: string,
  providerId: string
) => {

  const rental =
    await prisma.rentalOrder.findUniqueOrThrow({
      where: {
        id: rentalId,
      },

      include: {
        gear: true,
      },
    });

  if (
    rental.gear.providerId !== providerId
  ) {
    throw new Error(
      "You are not owner of this gear"
    );
  }

  if (
    rental.status !== RentalStatus.PLACED
  ) {
    throw new Error(
      "Only placed orders can be confirmed"
    );
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

const pickupRentalIntoDB = async (
  rentalId: string,
  providerId: string
) => {

  const rental =
    await prisma.rentalOrder.findUniqueOrThrow({
      where: {
        id: rentalId,
      },

      include: {
        gear: true,
      },
    });

  if (
    rental.gear.providerId !== providerId
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  if (
    rental.status !== RentalStatus.PAID
  ) {
    throw new Error(
      "Rental must be paid first"
    );
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

const returnRentalIntoDB = async (
  rentalId: string,
  providerId: string
) => {

  const rental =
    await prisma.rentalOrder.findUniqueOrThrow({
      where: {
        id: rentalId,
      },

      include: {
        gear: true,
      },
    });

  if (
    rental.gear.providerId !== providerId
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  if (
    rental.status !== RentalStatus.PICKED_UP
  ) {
    throw new Error(
      "Rental not picked up yet"
    );
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

const cancelRentalIntoDB = async (
  rentalId: string,
  customerId: string
) => {

  const rental =
    await prisma.rentalOrder.findUniqueOrThrow({
      where: {
        id: rentalId,
      },
    });

  if (
    rental.customerId !== customerId
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  if (
    rental.status !== RentalStatus.PLACED
  ) {
    throw new Error(
      "Only placed rental can be cancelled"
    );
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

const getProviderOrdersFromDB = async (
  providerId: string
) => {
  const orders =
    await prisma.rentalOrder.findMany({
      where: {
        gear: {
          providerId,
        },
      },
      include: {
        customer: true,
        gear: true,
        payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return orders;
};

const confirmOrderIntoDB = async (
  rentalId: string
) => {

  const rental =
    await prisma.rentalOrder.findUniqueOrThrow({
      where: {
        id: rentalId,
      },
    });

  if (rental.status !== "PLACED") {
    throw new Error(
      "Only placed orders can be confirmed"
    );
  }

  return prisma.rentalOrder.update({
    where: {
      id: rentalId,
    },
    data: {
      status: "CONFIRMED",
    },
  });
};

const cancelOrderIntoDB = async (
  rentalId: string
) => {

  const rental =
    await prisma.rentalOrder.findUniqueOrThrow({
      where: {
        id: rentalId,
      },
    });

  if (
    rental.status === "PAID" ||
    rental.status === "PICKED_UP" ||
    rental.status === "RETURNED"
  ) {
    throw new Error(
      "Order cannot be cancelled"
    );
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

const markPickedUpIntoDB = async (
  rentalId: string
) => {

  const rental =
    await prisma.rentalOrder.findUniqueOrThrow({
      where: {
        id: rentalId,
      },
    });

  if (rental.status !== "PAID") {
    throw new Error(
      "Payment required first"
    );
  }

  return prisma.rentalOrder.update({
    where: {
      id: rentalId,
    },
    data: {
      status: "PICKED_UP",
    },
  });
};

const markReturnedIntoDB = async (
  rentalId: string
) => {

  const rental =
    await prisma.rentalOrder.findUniqueOrThrow({
      where: {
        id: rentalId,
      },
    });

  if (rental.status !== "PICKED_UP") {
    throw new Error(
      "Gear must be picked up first"
    );
  }

  return prisma.rentalOrder.update({
    where: {
      id: rentalId,
    },
    data: {
      status: "RETURNED",
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
  confirmOrderIntoDB,
  cancelOrderIntoDB,
  markPickedUpIntoDB,
  markReturnedIntoDB,
};