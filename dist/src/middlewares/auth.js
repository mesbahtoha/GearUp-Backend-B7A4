import config from "../config";
import { prisma } from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
<<<<<<< HEAD
import { AppError } from "../utils/AppError";
import httpStatus from "http-status-codes";
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
export const auth = (...requiredRoles) => {
    return catchAsync(async (req, res, next) => {
        const token = req.cookies.accessToken ? req.cookies.accessToken :
            req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization?.split(" ")[1]
                : req.headers.authorization;
        if (!token) {
<<<<<<< HEAD
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not logged in. Please log in to access this resource.");
        }
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_acess_secret);
        if (!verifiedToken.success) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token. Please log in again.");
        }
        const { email, name, id, role } = verifiedToken.data;
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.FORBIDDEN, "Forbidden. You don't have permission to access this resource.");
        }
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new AppError(httpStatus.UNAUTHORIZED, "User not found. Please log in again.");
        }
        if (user.status === "SUSPENDED") {
            throw new AppError(httpStatus.FORBIDDEN, "Your account has been suspended. Please contact support team.");
=======
            throw new Error("You are not logged in. Please log in to access this resource.");
        }
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_acess_secret);
        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error);
        }
        const { email, name, id, role } = verifiedToken.data;
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("Forbidden. You don't have permission to access this resource.");
        }
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new Error("User not found. Please log in again.");
        }
        if (user.status === "SUSPENDED") {
            throw new Error("Your account has been suspened. Please contact with support team.");
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
        }
        req.user = {
            email,
            name,
            id,
            role,
        };
        next();
    });
};
//# sourceMappingURL=auth.js.map