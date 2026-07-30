export function getPagination(query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    return { page, limit, skip };
}
export function getPaginationMeta(page, limit, total) {
    return {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
    };
}
//# sourceMappingURL=pagination.js.map