import { RegisterUserPayload, UpdateProfilePayload } from "./user.interface";
declare const registerUserIntoDB: (payload: RegisterUserPayload) => Promise<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: import("../../../generated/prisma/enums").Role;
    status: import("../../../generated/prisma/enums").UserStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getMyProfileFromDB: (userId: string) => Promise<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: import("../../../generated/prisma/enums").Role;
    status: import("../../../generated/prisma/enums").UserStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const updateMyProfileInDB: (userId: string, payload: UpdateProfilePayload) => Promise<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: import("../../../generated/prisma/enums").Role;
    status: import("../../../generated/prisma/enums").UserStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const userService: {
    registerUserIntoDB: typeof registerUserIntoDB;
    getMyProfileFromDB: typeof getMyProfileFromDB;
    updateMyProfileInDB: typeof updateMyProfileInDB;
};
export {};
//# sourceMappingURL=user.service.d.ts.map