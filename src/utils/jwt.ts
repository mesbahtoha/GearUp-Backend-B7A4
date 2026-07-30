import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

<<<<<<< HEAD
const createToken = (payload: JwtPayload, secret: string, expiresIn: string | number) => {
    return jwt.sign(payload, secret, { expiresIn } as SignOptions);
=======
const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {
    const token = jwt.sign(payload, secret, { 
        expiresIn 
    } as SignOptions);

    return token;
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
}

const verifyToken = (token: string, secret: string) => {
    try {
        const verifiedToken = jwt.verify(token, secret);
        return {
            success: true,
            data: verifiedToken
        };
    } catch (error: any) {
        console.log("Token verification failed: ", error);
        return {
            success: false,
            error: error.message
        }
    }
}

export const jwtUtils = {
    createToken,
    verifyToken
}