import { Request, Response } from "express";
export declare const rentalController: {
    createRental: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getMyRentals: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSingleRental: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getProviderRentalRequests: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllRentals: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    confirmRental: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    pickupRental: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    returnRental: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    cancelRental: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getProviderOrders: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    confirmOrder: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    cancelOrder: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    markPickedUp: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    markReturned: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=rental.controller.d.ts.map