import { IChangePassword, ILoginUser } from "./auth.interface";
declare const loginUser: (payload: ILoginUser) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
declare const refreshToken: (token: string) => Promise<{
    accessToken: string;
}>;
declare const changePassword: (userId: string, payload: IChangePassword) => Promise<null>;
export declare const authService: {
    loginUser: typeof loginUser;
    refreshToken: typeof refreshToken;
    changePassword: typeof changePassword;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map