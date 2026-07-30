import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Category: 'Category';
    readonly GearItem: 'GearItem';
    readonly Payment: 'Payment';
    readonly RentalOrder: 'RentalOrder';
    readonly Review: 'Review';
    readonly User: 'User';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const CategoryScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly description: 'description';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const GearItemScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly description: 'description';
    readonly brand: 'brand';
    readonly image: 'image';
    readonly pricePerDay: 'pricePerDay';
    readonly stock: 'stock';
    readonly isAvailable: 'isAvailable';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
    readonly providerId: 'providerId';
    readonly categoryId: 'categoryId';
};
export type GearItemScalarFieldEnum = (typeof GearItemScalarFieldEnum)[keyof typeof GearItemScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: 'id';
    readonly amount: 'amount';
    readonly transactionId: 'transactionId';
    readonly provider: 'provider';
    readonly status: 'status';
    readonly paidAt: 'paidAt';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
    readonly rentalOrderId: 'rentalOrderId';
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const RentalOrderScalarFieldEnum: {
    readonly id: 'id';
    readonly quantity: 'quantity';
    readonly startDate: 'startDate';
    readonly endDate: 'endDate';
    readonly totalPrice: 'totalPrice';
    readonly status: 'status';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
    readonly customerId: 'customerId';
    readonly gearId: 'gearId';
};
export type RentalOrderScalarFieldEnum = (typeof RentalOrderScalarFieldEnum)[keyof typeof RentalOrderScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: 'id';
    readonly rating: 'rating';
    readonly comment: 'comment';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
    readonly customerId: 'customerId';
    readonly gearId: 'gearId';
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly email: 'email';
    readonly password: 'password';
    readonly phone: 'phone';
    readonly role: 'role';
    readonly status: 'status';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map