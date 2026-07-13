import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
  return prisma.user.findMany({
    omit: {
      password: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSingleUserFromDB = async (
  userId: string
) => {
  return prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },

    omit: {
      password: true,
    },
  });
};

const suspendUserIntoDB = async (
  userId: string
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      status: "SUSPENDED",
    },
  });
};

const activateUserIntoDB = async (
  userId: string
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      status: "ACTIVE",
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

const getAllPaymentsFromDB = async () => {
  return prisma.payment.findMany({
    include: {
      rentalOrder: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getDashboardStatsFromDB =
  async () => {

    const totalUsers =
      await prisma.user.count();

    const totalCustomers =
      await prisma.user.count({
        where: {
          role: "CUSTOMER",
        },
      });

    const totalProviders =
      await prisma.user.count({
        where: {
          role: "PROVIDER",
        },
      });

    const totalGears =
      await prisma.gearItem.count();

    const totalRentals =
      await prisma.rentalOrder.count();

    const totalPayments =
      await prisma.payment.count({
        where: {
          status: "COMPLETED",
        },
      });

    const revenue =
      await prisma.payment.aggregate({
        _sum: {
          amount: true,
        },

        where: {
          status: "COMPLETED",
        },
      });

    return {
      totalUsers,
      totalCustomers,
      totalProviders,
      totalGears,
      totalRentals,
      totalPayments,
      totalRevenue:
        revenue._sum.amount || 0,
    };
  };

const deleteGearFromDB = async (
  gearId: string
) => {
  await prisma.gearItem.delete({
    where: {
      id: gearId,
    },
  });

  return null;
};

export const adminService = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  suspendUserIntoDB,
  activateUserIntoDB,
  getAllRentalsFromDB,
  getAllPaymentsFromDB,
  getDashboardStatsFromDB,
  deleteGearFromDB,
};