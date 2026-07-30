import { prisma } from "../../lib/prisma";

const getProviderDashboardFromDB = async (
  providerId: string
) => {

  const totalGear =
    await prisma.gearItem.count({
      where: {
        providerId,
      },
    });

  const totalRentals =
    await prisma.rentalOrder.count({
      where: {
        gear: {
          providerId,
        },
      },
    });

  const pendingOrders =
    await prisma.rentalOrder.count({
      where: {
        gear: {
          providerId,
        },
        status: "PLACED",
      },
    });

  const confirmedOrders =
    await prisma.rentalOrder.count({
      where: {
        gear: {
          providerId,
        },
        status: "CONFIRMED",
      },
    });

  const returnedOrders =
    await prisma.rentalOrder.count({
      where: {
        gear: {
          providerId,
        },
        status: "RETURNED",
      },
    });

  const revenue =
    await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },

      where: {
        status: "COMPLETED",

        rentalOrder: {
          gear: {
            providerId,
          },
        },
      },
    });

  return {
    totalGear,
    totalRentals,
    pendingOrders,
    confirmedOrders,
    returnedOrders,
    totalRevenue:
      revenue._sum.amount || 0,
  };
};

const getCustomerDashboardFromDB =
  async (customerId: string) => {

    const totalOrders =
      await prisma.rentalOrder.count({
        where: {
          customerId,
        },
      });

    const activeOrders =
      await prisma.rentalOrder.count({
        where: {
          customerId,
          status: "PAID",
        },
      });

    const returnedOrders =
      await prisma.rentalOrder.count({
        where: {
          customerId,
          status: "RETURNED",
        },
      });

    const cancelledOrders =
      await prisma.rentalOrder.count({
        where: {
          customerId,
          status: "CANCELLED",
        },
      });

    const spent =
      await prisma.payment.aggregate({
        _sum: {
          amount: true,
        },

        where: {
          status: "COMPLETED",

          rentalOrder: {
            customerId,
          },
        },
      });

    return {
      totalOrders,
      activeOrders,
      returnedOrders,
      cancelledOrders,
      totalSpent:
        spent._sum.amount || 0,
    };
  };

export const dashboardService = {
  getProviderDashboardFromDB,
  getCustomerDashboardFromDB,
};