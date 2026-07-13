declare const getAllUsersFromDB: (query: any) => Promise<{
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }[];
}>;
declare const getSingleUserFromDB: (userId: string) => Promise<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: import("../../../generated/prisma/enums").Role;
    status: import("../../../generated/prisma/enums").UserStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const suspendUserIntoDB: (adminId: string, userId: string) => Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string | null;
    role: import("../../../generated/prisma/enums").Role;
    status: import("../../../generated/prisma/enums").UserStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const activateUserIntoDB: (userId: string) => Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string | null;
    role: import("../../../generated/prisma/enums").Role;
    status: import("../../../generated/prisma/enums").UserStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
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
        status: import("../../../generated/prisma/enums").RentalStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        gearId: string;
    })[];
}>;
declare const getAllPaymentsFromDB: (query: any) => Promise<{
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: ({
        rentalOrder: {
            id: string;
            quantity: number;
            startDate: Date;
            endDate: Date;
            totalPrice: number;
            status: import("../../../generated/prisma/enums").RentalStatus;
            createdAt: Date;
            updatedAt: Date;
            customerId: string;
            gearId: string;
        };
    } & {
        id: string;
        amount: number;
        transactionId: string | null;
        provider: import("../../../generated/prisma/enums").PaymentProvider;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        rentalOrderId: string;
    })[];
}>;
declare const getDashboardStatsFromDB: () => Promise<{
    totalUsers: number;
    totalCustomers: number;
    totalProviders: number;
    activeUsers: number;
    suspendedUsers: number;
    totalCategories: number;
    totalGears: number;
    availableGears: number;
    totalRentals: number;
    completedRentals: number;
    totalPayments: number;
    totalRevenue: number;
}>;
declare const deleteGearFromDB: (gearId: string) => Promise<{
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
declare const changeUserRoleIntoDB: (userId: string, role: "CUSTOMER" | "PROVIDER" | "ADMIN") => Promise<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: import("../../../generated/prisma/enums").Role;
    status: import("../../../generated/prisma/enums").UserStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const adminService: {
    getAllUsersFromDB: typeof getAllUsersFromDB;
    getSingleUserFromDB: typeof getSingleUserFromDB;
    suspendUserIntoDB: typeof suspendUserIntoDB;
    activateUserIntoDB: typeof activateUserIntoDB;
    getAllRentalsFromDB: typeof getAllRentalsFromDB;
    getAllPaymentsFromDB: typeof getAllPaymentsFromDB;
    getDashboardStatsFromDB: typeof getDashboardStatsFromDB;
    deleteGearFromDB: typeof deleteGearFromDB;
    changeUserRoleIntoDB: typeof changeUserRoleIntoDB;
};
export {};
//# sourceMappingURL=admin.service.d.ts.map