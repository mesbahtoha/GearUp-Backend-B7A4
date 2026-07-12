import { prisma } from "../../lib/prisma";
import {
  ICreateCategory,
  IUpdateCategory,
} from "./category.interface";


const createCategoryIntoDB = async (
  payload: ICreateCategory
) => {
  
  if (!payload.name) {
  throw new Error(
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
    throw new Error(
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