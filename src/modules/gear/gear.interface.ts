export interface ICreateGear {
  name: string;
  description: string;
  brand: string;
  image?: string;
  pricePerDay: number;
  stock: number;
  categoryId: string;
}

export interface IUpdateGear {
  name?: string;
  description?: string;
  brand?: string;
  image?: string;
  pricePerDay?: number;
  stock?: number;
  isAvailable?: boolean;
  categoryId?: string;
}

export interface IGetAllGearQuery {
  page?: string;
  limit?: string;
  search?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}