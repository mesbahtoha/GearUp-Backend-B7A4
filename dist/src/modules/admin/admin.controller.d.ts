import { Request, Response } from "express";
export declare const adminController: {
    getAllUsers: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSingleUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    suspendUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    activateUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllRentals: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllPayments: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getDashboardStats: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteGear: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    changeUserRole: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=admin.controller.d.ts.map