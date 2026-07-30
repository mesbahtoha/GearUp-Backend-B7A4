<<<<<<< HEAD
import { JwtPayload } from "jsonwebtoken";
declare const createToken: (payload: JwtPayload, secret: string, expiresIn: string | number) => string;
=======
import { JwtPayload, SignOptions } from "jsonwebtoken";
declare const createToken: (payload: JwtPayload, secret: string, expiresIn: SignOptions) => string;
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
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