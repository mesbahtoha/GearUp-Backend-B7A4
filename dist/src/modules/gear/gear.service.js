import { prisma } from "../../lib/prisma";
<<<<<<< HEAD
import { RentalStatus } from "../../../generated/prisma/enums";
import { getPagination, getPaginationMeta } from "../../utils/pagination";
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
const createGearIntoDB = async (providerId, payload) => {
    if (!payload.name?.trim()) {
        throw new Error("Gear name is required");
    }
    if (!payload.description?.trim()) {
        throw new Error("Description is required");
    }
    if (!payload.brand?.trim()) {
        throw new Error("Brand is required");
    }
    if (!payload.categoryId) {
        throw new Error("Category is required");
    }
    if (payload.pricePerDay <= 0) {
        throw new Error("Price per day must be greater than 0");
    }
    if (payload.stock < 0) {
        throw new Error("Stock cannot be negative");
    }
    const category = await prisma.category.findUnique({
        where: {
            id: payload.categoryId,
        },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    const gear = await prisma.gearItem.create({
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
// const getAllGearsFromDB = async () => {
//   const gears =
//     await prisma.gearItem.findMany({
//       include: {
//         category: true,
//         provider: {
//           select: {
//             id: true,
//             name: true,
//             email: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//   return gears;
// };
const getAllGearsFromDB = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = query.search || "";
    const categoryId = query.categoryId;
    const minPrice = query.minPrice ? Number(query.minPrice) : undefined;
    const maxPrice = query.maxPrice ? Number(query.maxPrice) : undefined;
    const where = {};
    // Search
    if (search) {
        where.OR = [
            {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                brand: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                description: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }
    // Category Filter
    if (categoryId) {
        where.categoryId = categoryId;
    }
    // Price Filter
    if (minPrice !== undefined || maxPrice !== undefined) {
        where.pricePerDay = {};
        if (minPrice !== undefined) {
            where.pricePerDay.gte = minPrice;
        }
        if (maxPrice !== undefined) {
            where.pricePerDay.lte = maxPrice;
        }
    }
    const gears = await prisma.gearItem.findMany({
        where,
        include: {
            category: true,
            provider: {
                omit: {
                    password: true,
                },
            },
        },
        skip,
        take: limit,
        orderBy: {
            [query.sortBy || "createdAt"]: query.sortOrder || "desc",
        },
    });
    const total = await prisma.gearItem.count({
        where,
    });
    return {
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
        data: gears,
    };
};
const getSingleGearFromDB = async (gearId) => {
    const gear = await prisma.gearItem.findUniqueOrThrow({
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
<<<<<<< HEAD
const getMyGearsFromDB = async (providerId, query) => {
    const { page, limit, skip } = getPagination({ ...query, limit: query?.limit || 100 });
    const where = { providerId };
    const [gears, total] = await Promise.all([
        prisma.gearItem.findMany({
            where,
            include: { category: true },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma.gearItem.count({ where }),
    ]);
    return { data: gears, meta: getPaginationMeta(page, limit, total) };
=======
const getMyGearsFromDB = async (providerId) => {
    const gears = await prisma.gearItem.findMany({
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
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
};
const updateGearIntoDB = async (gearId, providerId, payload) => {
    if (payload.pricePerDay !== undefined && payload.pricePerDay <= 0) {
        throw new Error("Price must be greater than 0");
    }
    if (payload.stock !== undefined && payload.stock < 0) {
        throw new Error("Stock cannot be negative");
    }
    const gear = await prisma.gearItem.findUniqueOrThrow({
        where: {
            id: gearId,
        },
    });
    if (gear.providerId !== providerId) {
        throw new Error("You can update only your own gear");
    }
    const updatedGear = await prisma.gearItem.update({
        where: {
            id: gearId,
        },
        data: payload,
    });
    return updatedGear;
};
const deleteGearFromDB = async (gearId, providerId) => {
    const gear = await prisma.gearItem.findUniqueOrThrow({
<<<<<<< HEAD
        where: { id: gearId },
=======
        where: {
            id: gearId,
        },
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    });
    if (gear.providerId !== providerId) {
        throw new Error("You can delete only your own gear");
    }
<<<<<<< HEAD
    const activeRentals = await prisma.rentalOrder.findFirst({
        where: {
            gearId,
            status: {
                in: [RentalStatus.PLACED, RentalStatus.CONFIRMED, RentalStatus.PAID, RentalStatus.PICKED_UP],
            },
        },
    });
    if (activeRentals) {
        throw new Error("Cannot delete gear with active rentals");
    }
    await prisma.$transaction(async (tx) => {
        const rentals = await tx.rentalOrder.findMany({
            where: { gearId },
            select: { id: true },
        });
        if (rentals.length > 0) {
            await tx.payment.deleteMany({
                where: { rentalOrderId: { in: rentals.map((r) => r.id) } },
            });
            await tx.rentalOrder.deleteMany({
                where: { gearId },
            });
        }
        await tx.gearItem.delete({
            where: { id: gearId },
        });
    });
=======
    await prisma.gearItem.delete({
        where: {
            id: gearId,
        },
    });
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
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
//# sourceMappingURL=gear.service.js.map