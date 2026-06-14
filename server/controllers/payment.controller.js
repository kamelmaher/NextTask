const stripe = require("../config/stripe");
const User = require("../models/user.model");
const { serverError, success } = require("../utils/responses");

exports.deposite = async (req, res) => {
    const { amount } = req.body;
    const userId = req.user._id;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Wallet Top Up",
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.CLIENT_URL}/wallet/success`,
            cancel_url: `${process.env.CLIENT_URL}/wallet/cancel`,
            metadata: {
                userId,
                amount,
                type: "WALLET_TOPUP",
            },
        });
        success(res, 200, { url: session.url });
    } catch (err) {
        console.log(err)
        serverError(res)
    }
};