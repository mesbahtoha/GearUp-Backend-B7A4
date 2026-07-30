declare const createCheckoutSession: (rentalId: string, customerId: string) => Promise<{
    checkoutUrl: string | null;
}>;
export declare const paymentService: {
    createCheckoutSession: typeof createCheckoutSession;
};
export {};
//# sourceMappingURL=payment.service.d.ts.map