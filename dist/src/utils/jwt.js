import jwt from "jsonwebtoken";
const createToken = (payload, secret, expiresIn) => {
<<<<<<< HEAD
    return jwt.sign(payload, secret, { expiresIn });
=======
    const token = jwt.sign(payload, secret, {
        expiresIn
    });
    return token;
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
};
const verifyToken = (token, secret) => {
    try {
        const verifiedToken = jwt.verify(token, secret);
        return {
            success: true,
            data: verifiedToken
        };
    }
    catch (error) {
        console.log("Token verification failed: ", error);
        return {
            success: false,
            error: error.message
        };
    }
};
export const jwtUtils = {
    createToken,
    verifyToken
};
//# sourceMappingURL=jwt.js.map