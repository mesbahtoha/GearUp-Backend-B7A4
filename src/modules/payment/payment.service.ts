import Stripe from "stripe";

import config from "../../config";
import { prisma } from "../../lib/prisma";

const stripe = new Stripe(
  config.stripe_secret_key
);

const createPaymentIntentIntoDB =
  async (
    rentalId: string
  ) => {

    const rental =
      await prisma.rentalOrder.findUniqueOrThrow({
        where: {
          id: rentalId,
        },
      });

    if (
      rental.status !== "CONFIRMED"
    ) {
      throw new Error(
        "Rental must be confirmed first"
      );
    }

    const amount =
      Math.round(
        rental.totalPrice * 100
      );

    const paymentIntent =
      await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: [
          "card",
        ],
      });

    return {
      clientSecret:
        paymentIntent.client_secret,
    };
  };

export const paymentService = {
  createPaymentIntentIntoDB,
};