const stripe = require("../config/stripe")
const User = require("../models/user.model")

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
        const amount = Number(session.metadata.amount);

        await User.findByIdAndUpdate(userId, {
            $inc: { balance: amount },
        });
    }

    res.json({ received: true });
};