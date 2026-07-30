export interface PaginationQuery {
    page?: number;
    limit?: number;
}
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}
export declare function getPagination(query: PaginationQuery): {
    page: number;
    limit: number;
    skip: number;
};
export declare function getPaginationMeta(page: number, limit: number, total: number): PaginationMeta;
//# sourceMappingURL=pagination.d.ts.map