import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma";
const stripe = new Stripe(config.stripe_secret_key);
const createCheckoutSession = async (rentalId, customerId) => {
    const rental = await prisma.rentalOrder.findUniqueOrThrow({
        where: {
            id: rentalId,
        },
        include: {
            gear: true,
        },
    });
    if (rental.customerId !==
        customerId) {
        throw new Error("Unauthorized rental");
    }
    if (rental.status !==
        "CONFIRMED") {
        throw new Error("Rental must be confirmed first");
    }
    const session = await stripe.checkout.sessions.create({
        payment_method_types: [
            "card",
        ],
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: rental.gear.name,
                    },
                    unit_amount: Math.round(rental.totalPrice *
                        100),
                },
                quantity: 1,
            },
        ],
        metadata: {
            rentalId: rental.id,
        },
        success_url: `${config.client_url}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.client_url}/payment-cancel`,
    });
    return {
        checkoutUrl: session.url,
    };
};
export const paymentService = {
    createCheckoutSession,
};
//# sourceMappingURL=payment.service.js.map