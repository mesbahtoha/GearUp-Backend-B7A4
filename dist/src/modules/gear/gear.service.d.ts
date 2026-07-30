import { ICreateGear, IGetAllGearQuery, IUpdateGear } from "./gear.interface";
declare const createGearIntoDB: (providerId: string, payload: ICreateGear) => Promise<{
    category: {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    name: string;
    description: string;
    brand: string;
    image: string | null;
    pricePerDay: number;
    stock: number;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
    providerId: string;
    categoryId: string;
}>;
declare const getAllGearsFromDB: (query: IGetAllGearQuery) => Promise<{
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: ({
        category: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        provider: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
<<<<<<< HEAD
            image: string | null;
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
            role: import("../../../generated/prisma/enums").Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        name: string;
        description: string;
        brand: string;
        image: string | null;
        pricePerDay: number;
        stock: number;
        isAvailable: boolean;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        categoryId: string;
    })[];
}>;
declare const getSingleGearFromDB: (gearId: string) => Promise<{
    category: {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    provider: {
        email: string;
        id: string;
        name: string;
    };
} & {
    id: string;
    name: string;
    description: string;
    brand: string;
    image: string | null;
    pricePerDay: number;
    stock: number;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
    providerId: string;
    categoryId: string;
}>;
<<<<<<< HEAD
declare const getMyGearsFromDB: (providerId: string, query?: {
    page?: number;
    limit?: number;
}) => Promise<{
    data: ({
        category: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        name: string;
        description: string;
        brand: string;
        image: string | null;
        pricePerDay: number;
        stock: number;
        isAvailable: boolean;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        categoryId: string;
    })[];
    meta: import("../../utils/pagination").PaginationMeta;
}>;
=======
declare const getMyGearsFromDB: (providerId: string) => Promise<({
    category: {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    name: string;
    description: string;
    brand: string;
    image: string | null;
    pricePerDay: number;
    stock: number;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
    providerId: string;
    categoryId: string;
})[]>;
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
declare const updateGearIntoDB: (gearId: string, providerId: string, payload: IUpdateGear) => Promise<{
    id: string;
    name: string;
    description: string;
    brand: string;
    image: string | null;
    pricePerDay: number;
    stock: number;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
    providerId: string;
    categoryId: string;
}>;
declare const deleteGearFromDB: (gearId: string, providerId: string) => Promise<null>;
export declare const gearService: {
    createGearIntoDB: typeof createGearIntoDB;
    getAllGearsFromDB: typeof getAllGearsFromDB;
    getSingleGearFromDB: typeof getSingleGearFromDB;
    getMyGearsFromDB: typeof getMyGearsFromDB;
    updateGearIntoDB: typeof updateGearIntoDB;
    deleteGearFromDB: typeof deleteGearFromDB;
};
export {};
//# sourceMappingURL=gear.service.d.ts.map