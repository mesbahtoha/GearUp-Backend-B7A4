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
<<<<<<< HEAD
    toggleGearAvailability: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    changeUserRole: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=admin.controller.d.ts.map