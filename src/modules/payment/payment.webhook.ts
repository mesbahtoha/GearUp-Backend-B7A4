import Stripe from "stripe";

import config from "../../config";
import { prisma } from "../../lib/prisma";

const stripe = new Stripe(
  config.stripe_secret_key
);

export const handleStripeWebhook =
  async (
    body: Buffer,
    signature: string
  ) => {

    const event =
      stripe.webhooks.constructEvent(
        body,
        signature,
        config
          .stripe_webhook_secret
      );

    if (
      event.type ===
      "checkout.session.completed"
    ) {

      const session =
        event.data
          .object as Stripe.Checkout.Session;

      const rentalId =
        session.metadata
          ?.rentalId;

      if (!rentalId)
        return;

      const rental =
        await prisma.rentalOrder.findUnique({
          where: {
            id: rentalId,
          },
        });

      if (!rental)
        return;

      await prisma.payment.upsert({
        where: {
          rentalOrderId:
            rentalId,
        },

        update: {
          status:
            "COMPLETED",

          provider:
            "STRIPE",

          amount:
            rental.totalPrice,

          transactionId:
            session.payment_intent?.toString(),

          paidAt:
            new Date(),
        },

        create: {
          rentalOrderId:
            rentalId,

          amount:
            rental.totalPrice,

          provider:
            "STRIPE",

          status:
            "COMPLETED",

          transactionId:
            session.payment_intent?.toString(),

          paidAt:
            new Date(),
        },
      });

      await prisma.rentalOrder.update({
        where: {
          id: rentalId,
        },

        data: {
          status: "PAID",
        },
      });
    }
  };