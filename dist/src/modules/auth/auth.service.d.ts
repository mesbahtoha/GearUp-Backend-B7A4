<<<<<<< HEAD
import { IChangePassword, IForgotPassword, ILoginUser } from "./auth.interface";
=======
import { IChangePassword, ILoginUser } from "./auth.interface";
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
declare const loginUser: (payload: ILoginUser) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
declare const refreshToken: (token: string) => Promise<{
    accessToken: string;
}>;
declare const changePassword: (userId: string, payload: IChangePassword) => Promise<null>;
<<<<<<< HEAD
declare const forgotPassword: (payload: IForgotPassword) => Promise<{
    message: string;
}>;
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
export declare const authService: {
    loginUser: typeof loginUser;
    refreshToken: typeof refreshToken;
    changePassword: typeof changePassword;
<<<<<<< HEAD
    forgotPassword: typeof forgotPassword;
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
};
export {};
//# sourceMappingURL=auth.service.d.ts.map