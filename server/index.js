const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser");
const { stripeWebhook } = require("./webhooks/stripeWebhook");
const app = express()

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://next-task-weld.vercel.app",
    process.env.WEBSITE_URL
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS blocked"));
        }
    },
    credentials: true
}));

// stripe webhook
// app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

app.use(express.json())
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Routes
const userRoute = require("./routes/user.route")
const projectRoute = require("./routes/project.route")
const categoryRoute = require("./routes/category.route")
const proposalRoute = require("./routes/proposal.route")
const contractRoute = require("./routes/contract.route")
const portfolioRoute = require("./routes/portfolio.route")
const paymentRoute = require("./routes/payment.route");
const transactionRoute = require("./routes/transaction.route");

app.use("/user", userRoute)
app.use("/project", projectRoute)
app.use("/category", categoryRoute)
app.use("/proposal", proposalRoute)
app.use("/contract", contractRoute)
app.use("/portfolio", portfolioRoute)
app.use("/payment", paymentRoute)
app.use("/transaction", transactionRoute)

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server Port: 3000`));
    }).catch((err) => {
        console.error("MongoDB connection error:", err);
    });