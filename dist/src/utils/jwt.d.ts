import { JwtPayload } from "jsonwebtoken";
declare const createToken: (payload: JwtPayload, secret: string, expiresIn: string | number) => string;
declare const verifyToken: (token: string, secret: string) => {
    success: boolean;
    data: string | JwtPayload;
    error?: undefined;
} | {
    data?: undefined;
    success: boolean;
    error: any;
};
export declare const jwtUtils: {
    createToken: typeof createToken;
    verifyToken: typeof verifyToken;
};
export {};
//# sourceMappingURL=jwt.d.ts.map