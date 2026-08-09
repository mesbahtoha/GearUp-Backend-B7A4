import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status-codes";

const stripe = new Stripe(
  config.stripe_secret_key
);

const createCheckoutSession =
  async (
    rentalId: string,
    customerId: string
  ) => {

    const rental =
      await prisma.rentalOrder.findUniqueOrThrow({
        where: {
          id: rentalId,
        },
        include: {
          gear: true,
        },
      });

    if (
      rental.customerId !==
      customerId
    ) {
      throw new AppError(httpStatus.BAD_REQUEST, 
        "Unauthorized rental"
      );
    }

    if (
      rental.status !==
      "CONFIRMED"
    ) {
      throw new AppError(httpStatus.BAD_REQUEST, 
        "Rental must be confirmed first"
      );
    }

    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: [
          "card",
        ],

        mode: "payment",

        line_items: [
          {
            price_data: {
              currency: "usd",

              product_data: {
                name:
                  rental.gear.name,
              },

              unit_amount:
                Math.round(
                  rental.totalPrice *
                    100
                ),
            },

            quantity: 1,
          },
        ],

        metadata: {
          rentalId:
            rental.id,
        },

        success_url:
          `${config.app_url}/dashboard/customer/orders?payment_success=true`,

        cancel_url:
          `${config.app_url}/payment-cancel`,
      });

    return {
      checkoutUrl:
        session.url,
    };
  };

export const paymentService = {
  createCheckoutSession,
};