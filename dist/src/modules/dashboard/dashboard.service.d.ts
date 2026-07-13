declare const getProviderDashboardFromDB: (providerId: string) => Promise<{
    totalGear: number;
    totalRentals: number;
    pendingOrders: number;
    confirmedOrders: number;
    returnedOrders: number;
    totalRevenue: number;
}>;
declare const getCustomerDashboardFromDB: (customerId: string) => Promise<{
    totalOrders: number;
    activeOrders: number;
    returnedOrders: number;
    cancelledOrders: number;
    totalSpent: number;
}>;
export declare const dashboardService: {
    getProviderDashboardFromDB: typeof getProviderDashboardFromDB;
    getCustomerDashboardFromDB: typeof getCustomerDashboardFromDB;
};
export {};
//# sourceMappingURL=dashboard.service.d.ts.map