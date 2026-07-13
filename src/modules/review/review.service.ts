import { prisma } from "../../lib/prisma";
import {
  ICreateReview,
  IUpdateReview,
} from "./review.interface";

const createReviewIntoDB = async (
  customerId: string,
  payload: ICreateReview
) => {
  const { gearId, rating, comment } =
    payload;

  if (rating < 1 || rating > 5) {
    throw new Error(
      "Rating must be between 1 and 5"
    );
  }

  const rental =
    await prisma.rentalOrder.findFirst({
      where: {
        customerId,
        gearId,
        status: "RETURNED",
      },
    });

  if (!rental) {
    throw new Error(
      "You can only review returned rentals"
    );
  }

  const existingReview =
    await prisma.review.findFirst({
      where: {
        customerId,
        gearId,
      },
    });

  if (existingReview) {
    throw new Error(
      "You already reviewed this gear"
    );
  }

  const review =
    await prisma.review.create({
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

const getMyReviewsFromDB = async (
  customerId: string
) => {
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

const getGearReviewsFromDB = async (
  gearId: string
) => {
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

const getAllReviewsFromDB =
  async () => {
    return prisma.review.findMany({
      include: {
        customer: true,
        gear: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };

const updateReviewIntoDB = async (
  reviewId: string,
  customerId: string,
  payload: IUpdateReview
) => {
  const review =
    await prisma.review.findUniqueOrThrow({
      where: {
        id: reviewId,
      },
    });

  if (
    review.customerId !== customerId
  ) {
    throw new Error(
      "You can update only your own review"
    );
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

const deleteReviewFromDB = async (
  reviewId: string,
  customerId: string
) => {
  const review =
    await prisma.review.findUniqueOrThrow({
      where: {
        id: reviewId,
      },
    });

  if (
    review.customerId !== customerId
  ) {
    throw new Error(
      "You can delete only your own review"
    );
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
  getAllReviewsFromDB,
  updateReviewIntoDB,
  deleteReviewFromDB,
};