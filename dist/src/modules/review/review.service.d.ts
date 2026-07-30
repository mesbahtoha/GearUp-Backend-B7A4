import { ICreateReview, IUpdateReview } from "./review.interface";
declare const createReviewIntoDB: (customerId: string, payload: ICreateReview) => Promise<{
    customer: {
        email: string;
        id: string;
        name: string;
    };
    gear: {
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
    };
} & {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
}>;
<<<<<<< HEAD
declare const getMyReviewsFromDB: (customerId: string, query?: {
    page?: number;
    limit?: number;
}) => Promise<{
    data: ({
        gear: {
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
        };
    } & {
        id: string;
        rating: number;
        comment: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        gearId: string;
    })[];
    meta: import("../../utils/pagination").PaginationMeta;
}>;
declare const getGearReviewsFromDB: (gearId: string, query?: {
    page?: number;
    limit?: number;
}) => Promise<{
    data: ({
        customer: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        rating: number;
        comment: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        gearId: string;
    })[];
    meta: import("../../utils/pagination").PaginationMeta;
}>;
declare const getProviderReviewsFromDB: (providerId: string, query?: {
    page?: number;
    limit?: number;
}) => Promise<{
    data: ({
        customer: {
            email: string;
            id: string;
            name: string;
        };
        gear: {
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
        };
    } & {
        id: string;
        rating: number;
        comment: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        gearId: string;
    })[];
    meta: import("../../utils/pagination").PaginationMeta;
}>;
declare const getAllReviewsFromDB: (query?: {
    page?: number;
    limit?: number;
}) => Promise<{
    data: ({
        customer: {
            id: string;
            name: string;
            email: string;
            password: string;
            phone: string | null;
            image: string | null;
            role: import("../../../generated/prisma/enums").Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
        gear: {
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
        };
    } & {
        id: string;
        rating: number;
        comment: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        gearId: string;
    })[];
    meta: import("../../utils/pagination").PaginationMeta;
}>;
=======
declare const getMyReviewsFromDB: (customerId: string) => Promise<({
    gear: {
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
    };
} & {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
})[]>;
declare const getGearReviewsFromDB: (gearId: string) => Promise<({
    customer: {
        id: string;
        name: string;
    };
} & {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
})[]>;
declare const getAllReviewsFromDB: () => Promise<({
    customer: {
        id: string;
        name: string;
        email: string;
        password: string;
        phone: string | null;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    };
    gear: {
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
    };
} & {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
})[]>;
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
declare const updateReviewIntoDB: (reviewId: string, customerId: string, payload: IUpdateReview) => Promise<{
    gear: {
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
    };
} & {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
}>;
declare const deleteReviewFromDB: (reviewId: string, customerId: string) => Promise<null>;
export declare const reviewService: {
    createReviewIntoDB: typeof createReviewIntoDB;
    getMyReviewsFromDB: typeof getMyReviewsFromDB;
    getGearReviewsFromDB: typeof getGearReviewsFromDB;
<<<<<<< HEAD
    getProviderReviewsFromDB: typeof getProviderReviewsFromDB;
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    getAllReviewsFromDB: typeof getAllReviewsFromDB;
    updateReviewIntoDB: typeof updateReviewIntoDB;
    deleteReviewFromDB: typeof deleteReviewFromDB;
};
export {};
//# sourceMappingURL=review.service.d.ts.map