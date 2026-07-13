import { prisma } from "../../lib/prisma";
const getAllUsersFromDB = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const where = {};
    if (query.role) {
        where.role = query.role;
    }
    if (query.status) {
        where.status = query.status;
    }
    if (query.search) {
        where.OR = [
            {
                name: {
                    contains: query.search,
                    mode: "insensitive",
                },
            },
            {
                email: {
                    contains: query.search,
                    mode: "insensitive",
                },
            },
        ];
    }
    const users = await prisma.user.findMany({
        where,
        omit: {
            password: true,
        },
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
    const total = await prisma.user.count({
        where,
    });
    return {
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
        data: users,
    };
};
const getSingleUserFromDB = async (userId) => {
    return prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        omit: {
            password: true,
        },
    });
};
const suspendUserIntoDB = async (adminId, userId) => {
    if (adminId === userId) {
        throw new Error("You cannot suspend yourself");
    }
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
    });
    if (user.role === "ADMIN") {
        throw new Error("Admin account cannot be suspended");
    }
    return prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            status: "SUSPENDED",
        },
    });
};
const activateUserIntoDB = async (userId) => {
    return prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            status: "ACTIVE",
        },
    });
};
const getAllRentalsFromDB = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const where = {};
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
            createdAt: "desc",
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
const getAllPaymentsFromDB = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const where = {};
    if (query.status) {
        where.status = query.status;
    }
    if (query.provider) {
        where.provider =
            query.provider;
    }
    const payments = await prisma.payment.findMany({
        where,
        include: {
            rentalOrder: true,
        },
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
    const total = await prisma.payment.count({
        where,
    });
    return {
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
        data: payments,
    };
};
const getDashboardStatsFromDB = async () => {
    const totalUsers = await prisma.user.count();
    const totalCustomers = await prisma.user.count({
        where: {
            role: "CUSTOMER",
        },
    });
    const totalProviders = await prisma.user.count({
        where: {
            role: "PROVIDER",
        },
    });
    const activeUsers = await prisma.user.count({
        where: {
            status: "ACTIVE",
        },
    });
    const suspendedUsers = await prisma.user.count({
        where: {
            status: "SUSPENDED",
        },
    });
    const totalCategories = await prisma.category.count();
    const totalGears = await prisma.gearItem.count();
    const availableGears = await prisma.gearItem.count({
        where: {
            isAvailable: true,
        },
    });
    const totalRentals = await prisma.rentalOrder.count();
    const completedRentals = await prisma.rentalOrder.count({
        where: {
            status: "RETURNED",
        },
    });
    const totalPayments = await prisma.payment.count({
        where: {
            status: "COMPLETED",
        },
    });
    const revenue = await prisma.payment.aggregate({
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
        activeUsers,
        suspendedUsers,
        totalCategories,
        totalGears,
        availableGears,
        totalRentals,
        completedRentals,
        totalPayments,
        totalRevenue: revenue._sum.amount || 0,
    };
};
const deleteGearFromDB = async (gearId) => {
    return prisma.gearItem.update({
        where: {
            id: gearId,
        },
        data: {
            isAvailable: false,
        },
    });
};
const changeUserRoleIntoDB = async (userId, role) => {
    return prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            role,
        },
        omit: {
            password: true,
        },
    });
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
    changeUserRoleIntoDB,
};
//# sourceMappingURL=admin.service.js.map