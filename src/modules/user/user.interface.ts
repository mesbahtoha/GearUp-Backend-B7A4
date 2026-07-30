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
<<<<<<< HEAD
  image?: string;
=======
>>>>>>> 6f00a62e9c1f7f112da4c8782e8bc648baeb8915
}