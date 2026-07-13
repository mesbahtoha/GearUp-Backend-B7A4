import { prisma } from "../../lib/prisma";
import { RentalStatus } from "../../../generated/prisma/enums";
const createRentalIntoDB = async (customerId, payload) => {
    if (!payload.gearId) {
        throw new Error("Gear ID is required");
    }
    if (!payload.startDate) {
        throw new Error("Start date is required");
    }
    if (!payload.endDate) {
        throw new Error("End date is required");
    }
    if (!payload.quantity || payload.quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
    }
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
    if (startDate >= endDate) {
        throw new Error("End date must be after start date");
    }
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) || 1;
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
const getMyRentalsFromDB = async (customerId, query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const where = {
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
const getSingleRentalFromDB = async (rentalId) => {
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
const getProviderRentalRequestsFromDB = async (providerId) => {
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
const confirmRentalIntoDB = async (rentalId, providerId) => {
    const rental = await prisma.rentalOrder.findUniqueOrThrow({
        where: {
            id: rentalId,
        },
        include: {
            gear: true,
        },
    });
    if (rental.gear.providerId !== providerId) {
        throw new Error("You are not owner of this gear");
    }
    if (rental.status !== RentalStatus.PLACED) {
        throw new Error("Only placed orders can be confirmed");
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
const pickupRentalIntoDB = async (rentalId, providerId) => {
    const rental = await prisma.rentalOrder.findUniqueOrThrow({
        where: {
            id: rentalId,
        },
        include: {
            gear: true,
        },
    });
    if (rental.gear.providerId !== providerId) {
        throw new Error("Unauthorized");
    }
    if (rental.status !== RentalStatus.PAID) {
        throw new Error("Rental must be paid first");
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
const returnRentalIntoDB = async (rentalId, providerId) => {
    const rental = await prisma.rentalOrder.findUniqueOrThrow({
        where: {
            id: rentalId,
        },
        include: {
            gear: true,
        },
    });
    if (rental.gear.providerId !== providerId) {
        throw new Error("Unauthorized");
    }
    if (rental.status !== RentalStatus.PICKED_UP) {
        throw new Error("Rental not picked up yet");
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
const cancelRentalIntoDB = async (rentalId, customerId) => {
    const rental = await prisma.rentalOrder.findUniqueOrThrow({
        where: {
            id: rentalId,
        },
    });
    if (rental.customerId !== customerId) {
        throw new Error("Unauthorized");
    }
    if (rental.status !== RentalStatus.PLACED) {
        throw new Error("Only placed rental can be cancelled");
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
const getProviderOrdersFromDB = async (providerId, query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const where = {
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
const confirmOrderIntoDB = async (rentalId) => {
    const rental = await prisma.rentalOrder.findUniqueOrThrow({
        where: {
            id: rentalId,
        },
    });
    if (rental.status !== "PLACED") {
        throw new Error("Only placed orders can be confirmed");
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
const cancelOrderIntoDB = async (rentalId) => {
    const rental = await prisma.rentalOrder.findUniqueOrThrow({
        where: {
            id: rentalId,
        },
    });
    if (rental.status === "PAID" ||
        rental.status === "PICKED_UP" ||
        rental.status === "RETURNED") {
        throw new Error("Order cannot be cancelled");
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
const markPickedUpIntoDB = async (rentalId) => {
    const rental = await prisma.rentalOrder.findUniqueOrThrow({
        where: {
            id: rentalId,
        },
    });
    if (rental.status !== "PAID") {
        throw new Error("Payment required first");
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
const markReturnedIntoDB = async (rentalId) => {
    const rental = await prisma.rentalOrder.findUniqueOrThrow({
        where: {
            id: rentalId,
        },
    });
    if (rental.status !== "PICKED_UP") {
        throw new Error("Gear must be picked up first");
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
//# sourceMappingURL=rental.service.js.map