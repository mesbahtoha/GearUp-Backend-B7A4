export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "CUSTOMER" | "PROVIDER";
}

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
}