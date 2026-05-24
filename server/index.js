const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser");
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser());


// Routes
const userRoutes = require("./routes/user.routes")

app.use("/user", userRoutes)

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server Port: 3000`));
    })