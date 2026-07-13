import { prisma } from "../../lib/prisma";
const createCategoryIntoDB = async (payload) => {
    if (!payload.name) {
        throw new Error("Category name is required");
    }
    const existingCategory = await prisma.category.findUnique({
        where: {
            name: payload.name,
        },
    });
    if (existingCategory) {
        throw new Error("Category already exists");
    }
    const category = await prisma.category.create({
        data: payload,
    });
    return category;
};
const getAllCategoriesFromDB = async () => {
    const categories = await prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return categories;
};
const getSingleCategoryFromDB = async (categoryId) => {
    const category = await prisma.category.findUniqueOrThrow({
        where: {
            id: categoryId,
        },
    });
    return category;
};
const updateCategoryIntoDB = async (categoryId, payload) => {
    const category = await prisma.category.update({
        where: {
            id: categoryId,
        },
        data: payload,
    });
    return category;
};
const deleteCategoryFromDB = async (categoryId) => {
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
//# sourceMappingURL=category.service.js.map