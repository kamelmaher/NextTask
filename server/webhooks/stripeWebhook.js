const stripe = require("../config/stripe")
const User = require("../models/user.model")
const Transaction = require("../models/transaction.model")
const { transactionTypes } = require("../utils");
const { transactionStatus } = require("../utils/status");

exports.stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const userId = session.metadata.userId;
        const amount = session.amount_total / 100;

        const exists = await Transaction.findOne({
            stripeSessionId: session.id
        });

        if (exists) return;

        await User.findByIdAndUpdate(userId, {
            $inc: { balance: amount },
        });

        await Transaction.create({
            user: userId,
            type: transactionTypes.DEPOSITE,
            status: transactionStatus.COMPLETED,
            stripeSessionId: session.id,
            amount
        })
    }

    res.json({ received: true });
};