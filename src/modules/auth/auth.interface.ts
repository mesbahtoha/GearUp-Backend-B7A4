export interface ILoginUser {
  email: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IForgotPassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}