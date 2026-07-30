import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
<<<<<<< HEAD
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status-codes";
const loginUser = async (payload) => {
    const { email, password } = payload;
    if (!email?.trim()) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
    }
    if (!password?.trim()) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password is required");
=======
const loginUser = async (payload) => {
    const { email, password } = payload;
    if (!email?.trim()) {
        throw new Error("Email is required");
    }
    if (!password?.trim()) {
        throw new Error("Password is required");
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    }
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
<<<<<<< HEAD
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password.");
    }
    if (user.status === "SUSPENDED") {
        throw new AppError(httpStatus.FORBIDDEN, "Your account has been suspended. Please contact support.");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password.");
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
=======
        throw new Error("User does not exist!");
    }
    if (user.status === "SUSPENDED") {
        throw new Error("Your account has been suspended. Please contact support.");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Invalid email or password.");
    }
    const jwtPayload = {
        id: user.id,
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
        email: user.email,
        role: user.role,
    };
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_acess_secret, config.jwt_access_expires_in);
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
};
const refreshToken = async (token) => {
    if (!token) {
<<<<<<< HEAD
        throw new AppError(httpStatus.BAD_REQUEST, "Refresh token is required");
    }
    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_refresh_secret);
    if (!verifiedToken.success) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired refresh token");
    }
    const { id } = verifiedToken.data;
    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, "User not found. Please log in again.");
    }
    if (user.status === "SUSPENDED") {
        throw new AppError(httpStatus.FORBIDDEN, "Your account has been suspended. Please contact support.");
    }
=======
        throw new Error("Refresh token is required");
    }
    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_refresh_secret);
    if (!verifiedToken.success) {
        throw new Error("Invalid refresh token");
    }
    const { id } = verifiedToken.data;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    const accessToken = jwtUtils.createToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }, config.jwt_acess_secret, config.jwt_access_expires_in);
    return {
        accessToken,
    };
};
const changePassword = async (userId, payload) => {
    if (!payload.oldPassword?.trim()) {
<<<<<<< HEAD
        throw new AppError(httpStatus.BAD_REQUEST, "Old password is required");
    }
    if (!payload.newPassword?.trim()) {
        throw new AppError(httpStatus.BAD_REQUEST, "New password is required");
    }
    if (payload.newPassword.length < 6) {
        throw new AppError(httpStatus.BAD_REQUEST, "New password must be at least 6 characters");
    }
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, "User not found.");
    }
    const isMatched = await bcrypt.compare(payload.oldPassword, user.password);
    if (!isMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Old password is incorrect");
=======
        throw new Error("Old password is required");
    }
    if (!payload.newPassword?.trim()) {
        throw new Error("New password is required");
    }
    if (payload.newPassword.length < 6) {
        throw new Error("New password must be at least 6 characters");
    }
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
    });
    const isMatched = await bcrypt.compare(payload.oldPassword, user.password);
    if (!isMatched) {
        throw new Error("Old password is incorrect");
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
    }
    const hashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            password: hashedPassword,
        },
    });
    return null;
};
<<<<<<< HEAD
const forgotPassword = async (payload) => {
    const { email, oldPassword, newPassword } = payload;
    if (!email?.trim()) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email is required");
    }
    if (!oldPassword?.trim()) {
        throw new AppError(httpStatus.BAD_REQUEST, "Current password is required");
    }
    if (!newPassword?.trim()) {
        throw new AppError(httpStatus.BAD_REQUEST, "New password is required");
    }
    if (newPassword.length < 6) {
        throw new AppError(httpStatus.BAD_REQUEST, "New password must be at least 6 characters");
    }
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
    }
    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
    }
    const hashedPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));
    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });
    return { message: "Password reset successfully. You can now log in with your new password." };
};
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
export const authService = {
    loginUser,
    refreshToken,
    changePassword,
<<<<<<< HEAD
    forgotPassword,
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
};
//# sourceMappingURL=auth.service.js.map