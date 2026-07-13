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
    getAllReviewsFromDB: typeof getAllReviewsFromDB;
    updateReviewIntoDB: typeof updateReviewIntoDB;
    deleteReviewFromDB: typeof deleteReviewFromDB;
};
export {};
//# sourceMappingURL=review.service.d.ts.map