import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status-codes";
import {
  ICreateCategory,
  IUpdateCategory,
} from "./category.interface";


const createCategoryIntoDB = async (
  payload: ICreateCategory
) => {
  
  if (!payload.name) {
  throw new AppError(httpStatus.BAD_REQUEST, 
    "Category name is required"
  );
}

  const existingCategory =
    await prisma.category.findUnique({
      where: {
        name: payload.name,
      },
    });

  if (existingCategory) {
    throw new AppError(httpStatus.BAD_REQUEST, 
      "Category already exists"
    );
  }

  const category =
    await prisma.category.create({
      data: payload,
    });

  return category;
};

const getAllCategoriesFromDB = async () => {
  const categories =
    await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return categories;
};

const getSingleCategoryFromDB = async (
  categoryId: string
) => {
  const category =
    await prisma.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
    });

  return category;
};

const updateCategoryIntoDB = async (
  categoryId: string,
  payload: IUpdateCategory
) => {
  const category =
    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: payload,
    });

  return category;
};

const deleteCategoryFromDB = async (
  categoryId: string
) => {
  const gearCount = await prisma.gearItem.count({
    where: { categoryId },
  });

  if (gearCount > 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 
      `Cannot delete category: ${gearCount} gear item(s) are using it. Reassign them first.`
    );
  }

  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return null;
};

export const categoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};