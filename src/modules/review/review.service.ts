import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status-codes";
import { ICreateReview, IUpdateReview } from "./review.interface";
import { getPagination, getPaginationMeta } from "../../utils/pagination";

const createReviewIntoDB = async (
  customerId: string,
  payload: ICreateReview,
) => {
  const { gearId, rating, comment } = payload;

  if (!gearId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Gear ID is required");
  }

  if (rating === undefined) {
    throw new AppError(httpStatus.BAD_REQUEST, "Rating is required");
  }

  if (rating < 1 || rating > 5) {
    throw new AppError(httpStatus.BAD_REQUEST, "Rating must be between 1 and 5");
  }

  const rental = await prisma.rentalOrder.findFirst({
    where: {
      customerId,
      gearId,
      status: "RETURNED",
    },
  });

  if (!rental) {
    throw new AppError(httpStatus.BAD_REQUEST, "You can only review returned rentals");
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      customerId,
      gearId,
    },
  });

  if (existingReview) {
    throw new AppError(httpStatus.BAD_REQUEST, "You already reviewed this gear");
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

const getMyReviewsFromDB = async (customerId: string, query?: { page?: number; limit?: number }) => {
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

const getGearReviewsFromDB = async (gearId: string, query?: { page?: number; limit?: number }) => {
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

const getProviderReviewsFromDB = async (providerId: string, query?: { page?: number; limit?: number }) => {
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

const getAllReviewsFromDB = async (query?: { page?: number; limit?: number }) => {
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
};

const updateReviewIntoDB = async (
  reviewId: string,
  customerId: string,
  payload: IUpdateReview,
) => {
  if (
    payload.rating !== undefined &&
    (payload.rating < 1 || payload.rating > 5)
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Rating must be between 1 and 5");
  }

  const review = await prisma.review.findUniqueOrThrow({
    where: {
      id: reviewId,
    },
  });

  if (review.customerId !== customerId) {
    throw new AppError(httpStatus.BAD_REQUEST, "You can update only your own review");
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

const deleteReviewFromDB = async (reviewId: string, customerId: string, isAdmin = false) => {
  const review = await prisma.review.findUniqueOrThrow({
    where: {
      id: reviewId,
    },
  });

  if (!isAdmin && review.customerId !== customerId) {
    throw new AppError(httpStatus.BAD_REQUEST, "You can delete only your own review");
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
  getProviderReviewsFromDB,
  getAllReviewsFromDB,
  updateReviewIntoDB,
  deleteReviewFromDB,
};
