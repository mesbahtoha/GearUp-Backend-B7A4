import { prisma } from "../../lib/prisma";
import { ICreateGear, IGetAllGearQuery, IUpdateGear } from "./gear.interface";

const createGearIntoDB = async (providerId: string, payload: ICreateGear) => {
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

const getAllGearsFromDB = async (query: IGetAllGearQuery) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const search = query.search || "";

  const categoryId = query.categoryId;

  const minPrice = query.minPrice ? Number(query.minPrice) : undefined;

  const maxPrice = query.maxPrice ? Number(query.maxPrice) : undefined;

  const where: any = {};

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

const getSingleGearFromDB = async (gearId: string) => {
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

const getMyGearsFromDB = async (providerId: string) => {
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
};

const updateGearIntoDB = async (
  gearId: string,
  providerId: string,
  payload: IUpdateGear,
) => {
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

const deleteGearFromDB = async (gearId: string, providerId: string) => {
  const gear = await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: gearId,
    },
  });

  if (gear.providerId !== providerId) {
    throw new Error("You can delete only your own gear");
  }

  await prisma.gearItem.delete({
    where: {
      id: gearId,
    },
  });

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
