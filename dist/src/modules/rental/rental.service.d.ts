import { RentalStatus } from "../../../generated/prisma/enums";
import { ICreateRental } from "./rental.interface";
declare const createRentalIntoDB: (customerId: string, payload: ICreateRental) => Promise<{
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
    quantity: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
}>;
declare const getMyRentalsFromDB: (customerId: string, query: any) => Promise<{
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
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
        payment: {
            id: string;
            amount: number;
            transactionId: string | null;
            provider: import("../../../generated/prisma/enums").PaymentProvider;
            status: import("../../../generated/prisma/enums").PaymentStatus;
            paidAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            rentalOrderId: string;
        } | null;
    } & {
        id: string;
        quantity: number;
        startDate: Date;
        endDate: Date;
        totalPrice: number;
        status: RentalStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        gearId: string;
    })[];
}>;
declare const getSingleRentalFromDB: (rentalId: string) => Promise<{
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
    payment: {
        id: string;
        amount: number;
        transactionId: string | null;
        provider: import("../../../generated/prisma/enums").PaymentProvider;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        rentalOrderId: string;
    } | null;
} & {
    id: string;
    quantity: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
}>;
declare const getProviderRentalRequestsFromDB: (providerId: string) => Promise<({
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
    quantity: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
})[]>;
declare const getAllRentalsFromDB: (query: any) => Promise<{
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: ({
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
        payment: {
            id: string;
            amount: number;
            transactionId: string | null;
            provider: import("../../../generated/prisma/enums").PaymentProvider;
            status: import("../../../generated/prisma/enums").PaymentStatus;
            paidAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            rentalOrderId: string;
        } | null;
    } & {
        id: string;
        quantity: number;
        startDate: Date;
        endDate: Date;
        totalPrice: number;
        status: RentalStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        gearId: string;
    })[];
}>;
declare const confirmRentalIntoDB: (rentalId: string, providerId: string) => Promise<{
    id: string;
    quantity: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
}>;
declare const pickupRentalIntoDB: (rentalId: string, providerId: string) => Promise<{
    id: string;
    quantity: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
}>;
declare const returnRentalIntoDB: (rentalId: string, providerId: string) => Promise<{
    id: string;
    quantity: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
}>;
declare const cancelRentalIntoDB: (rentalId: string, customerId: string) => Promise<{
    id: string;
    quantity: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
}>;
declare const getProviderOrdersFromDB: (providerId: string, query: any) => Promise<{
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: ({
        customer: {
            id: string;
            name: string;
            email: string;
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
        payment: {
            id: string;
            amount: number;
            transactionId: string | null;
            provider: import("../../../generated/prisma/enums").PaymentProvider;
            status: import("../../../generated/prisma/enums").PaymentStatus;
            paidAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            rentalOrderId: string;
        } | null;
    } & {
        id: string;
        quantity: number;
        startDate: Date;
        endDate: Date;
        totalPrice: number;
        status: RentalStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        gearId: string;
    })[];
}>;
declare const confirmOrderIntoDB: (rentalId: string) => Promise<{
    id: string;
    quantity: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
}>;
declare const cancelOrderIntoDB: (rentalId: string) => Promise<{
    id: string;
    quantity: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
}>;
declare const markPickedUpIntoDB: (rentalId: string) => Promise<{
    id: string;
    quantity: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
}>;
declare const markReturnedIntoDB: (rentalId: string) => Promise<{
    id: string;
    quantity: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: RentalStatus;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
    gearId: string;
}>;
export declare const rentalService: {
    createRentalIntoDB: typeof createRentalIntoDB;
    getMyRentalsFromDB: typeof getMyRentalsFromDB;
    getSingleRentalFromDB: typeof getSingleRentalFromDB;
    getProviderRentalRequestsFromDB: typeof getProviderRentalRequestsFromDB;
    getAllRentalsFromDB: typeof getAllRentalsFromDB;
    confirmRentalIntoDB: typeof confirmRentalIntoDB;
    pickupRentalIntoDB: typeof pickupRentalIntoDB;
    returnRentalIntoDB: typeof returnRentalIntoDB;
    cancelRentalIntoDB: typeof cancelRentalIntoDB;
    getProviderOrdersFromDB: typeof getProviderOrdersFromDB;
    confirmOrderIntoDB: typeof confirmOrderIntoDB;
    cancelOrderIntoDB: typeof cancelOrderIntoDB;
    markPickedUpIntoDB: typeof markPickedUpIntoDB;
    markReturnedIntoDB: typeof markReturnedIntoDB;
};
export {};
//# sourceMappingURL=rental.service.d.ts.map