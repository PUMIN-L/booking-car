
const express = require("express")
const stripeRouter = express.Router()


stripeRouter.use(express.static(process.env.STATIC_DIR));
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});
stripeRouter.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});

stripeRouter.post("/create-payment-intent", async (req, res) => {
    try {
        let amount = 50
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "EUR",
            amount: amount,
            automatic_payment_methods: { enabled: true, allow_redirects: "never" },
        });
        res.json({
            amount: amount,
            clientSecret: paymentIntent.client_secret
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});

module.exports = stripeRouter

