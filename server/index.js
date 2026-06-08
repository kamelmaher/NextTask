const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser");
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser());


// Routes
const userRoute = require("./routes/user.route")
const projectRoute = require("./routes/project.route")
const categoryRoute = require("./routes/category.route")
const proposalRoute = require("./routes/proposal.route")
const contractRoute = require("./routes/contract.route")
const portfolioRoute = require("./routes/portfolio.route")

app.use("/user", userRoute)
app.use("/project", projectRoute)
app.use("/category", categoryRoute)
app.use("/proposal", proposalRoute)
app.use("/contract", contractRoute)
app.use("/portfolio", portfolioRoute)

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server Port: 3000`));
    }).catch((err) => {
        console.error("MongoDB connection error:", err);
    });