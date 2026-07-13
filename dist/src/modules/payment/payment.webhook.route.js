import express from "express";
import { handleStripeWebhook } from "./payment.webhook";
const router = express.Router();
router.post("/stripe", express.raw({
    type: "application/json",
}), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    try {
        await handleStripeWebhook(req.body, sig);
        res.json({
            received: true,
        });
    }
    catch (error) {
        console.error(error);
        res
            .status(400)
            .send("Webhook Error");
    }
});
export default router;
//# sourceMappingURL=payment.webhook.route.js.map