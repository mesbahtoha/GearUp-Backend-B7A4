import { ICreateCategory, IUpdateCategory } from "./category.interface";
declare const createCategoryIntoDB: (payload: ICreateCategory) => Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getAllCategoriesFromDB: () => Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}[]>;
declare const getSingleCategoryFromDB: (categoryId: string) => Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const updateCategoryIntoDB: (categoryId: string, payload: IUpdateCategory) => Promise<{
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const deleteCategoryFromDB: (categoryId: string) => Promise<null>;
export declare const categoryService: {
    createCategoryIntoDB: typeof createCategoryIntoDB;
    getAllCategoriesFromDB: typeof getAllCategoriesFromDB;
    getSingleCategoryFromDB: typeof getSingleCategoryFromDB;
    updateCategoryIntoDB: typeof updateCategoryIntoDB;
    deleteCategoryFromDB: typeof deleteCategoryFromDB;
};
export {};
//# sourceMappingURL=category.service.d.ts.map