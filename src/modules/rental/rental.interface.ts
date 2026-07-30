export interface ICreateRental {
  gearId: string;
  quantity: number;
  startDate: string;
  endDate: string;
}

export interface IGetRentalQuery {
  page?: string;
  limit?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}