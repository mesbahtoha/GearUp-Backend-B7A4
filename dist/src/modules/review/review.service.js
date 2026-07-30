import { prisma } from "../../lib/prisma";
<<<<<<< HEAD
import { getPagination, getPaginationMeta } from "../../utils/pagination";
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
const createReviewIntoDB = async (customerId, payload) => {
    const { gearId, rating, comment } = payload;
    if (!gearId) {
        throw new Error("Gear ID is required");
    }
    if (rating === undefined) {
        throw new Error("Rating is required");
    }
    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }
    const rental = await prisma.rentalOrder.findFirst({
        where: {
            customerId,
            gearId,
            status: "RETURNED",
        },
    });
    if (!rental) {
        throw new Error("You can only review returned rentals");
    }
    const existingReview = await prisma.review.findFirst({
        where: {
            customerId,
            gearId,
        },
    });
    if (existingReview) {
        throw new Error("You already reviewed this gear");
    }
    const review = await prisma.review.create({
        data: {
            rating,
            comment,
            customerId,
            gearId,
        },
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            gear: true,
        },
    });
    return review;
};
<<<<<<< HEAD
const getMyReviewsFromDB = async (customerId, query) => {
    const { page, limit, skip } = getPagination(query || {});
    const [reviews, total] = await Promise.all([
        prisma.review.findMany({
            where: { customerId },
            include: { gear: true },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma.review.count({ where: { customerId } }),
    ]);
    return { data: reviews, meta: getPaginationMeta(page, limit, total) };
};
const getGearReviewsFromDB = async (gearId, query) => {
    const { page, limit, skip } = getPagination(query || {});
    const [reviews, total] = await Promise.all([
        prisma.review.findMany({
            where: { gearId },
            include: { customer: { select: { id: true, name: true } } },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma.review.count({ where: { gearId } }),
    ]);
    return { data: reviews, meta: getPaginationMeta(page, limit, total) };
};
const getProviderReviewsFromDB = async (providerId, query) => {
    const { page, limit, skip } = getPagination(query || {});
    const where = { gear: { providerId } };
    const [reviews, total] = await Promise.all([
        prisma.review.findMany({
            where,
            include: { customer: { select: { id: true, name: true, email: true } }, gear: true },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma.review.count({ where }),
    ]);
    return { data: reviews, meta: getPaginationMeta(page, limit, total) };
};
const getAllReviewsFromDB = async (query) => {
    const { page, limit, skip } = getPagination(query || {});
    const [reviews, total] = await Promise.all([
        prisma.review.findMany({
            include: { customer: true, gear: true },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma.review.count(),
    ]);
    return { data: reviews, meta: getPaginationMeta(page, limit, total) };
=======
const getMyReviewsFromDB = async (customerId) => {
    return prisma.review.findMany({
        where: {
            customerId,
        },
        include: {
            gear: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getGearReviewsFromDB = async (gearId) => {
    return prisma.review.findMany({
        where: {
            gearId,
        },
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getAllReviewsFromDB = async () => {
    return prisma.review.findMany({
        include: {
            customer: true,
            gear: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
};
const updateReviewIntoDB = async (reviewId, customerId, payload) => {
    if (payload.rating !== undefined &&
        (payload.rating < 1 || payload.rating > 5)) {
        throw new Error("Rating must be between 1 and 5");
    }
    const review = await prisma.review.findUniqueOrThrow({
        where: {
            id: reviewId,
        },
    });
    if (review.customerId !== customerId) {
        throw new Error("You can update only your own review");
    }
    return prisma.review.update({
        where: {
            id: reviewId,
        },
        data: payload,
        include: {
            gear: true,
        },
    });
};
const deleteReviewFromDB = async (reviewId, customerId) => {
    const review = await prisma.review.findUniqueOrThrow({
        where: {
            id: reviewId,
        },
    });
    if (review.customerId !== customerId) {
        throw new Error("You can delete only your own review");
    }
    await prisma.review.delete({
        where: {
            id: reviewId,
        },
    });
    return null;
};
export const reviewService = {
    createReviewIntoDB,
    getMyReviewsFromDB,
    getGearReviewsFromDB,
<<<<<<< HEAD
    getProviderReviewsFromDB,
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    getAllReviewsFromDB,
    updateReviewIntoDB,
    deleteReviewFromDB,
};
//# sourceMappingURL=review.service.js.map