const router = require("express").Router()

const { deposite } = require("../controllers/payment.controller")
const verifyToken = require("../middlewares/verifyToken")
const { paymentLimiter } = require("../middlewares/rateLimiter")

router.post("/create-checkout-session", verifyToken, paymentLimiter, deposite)

module.exports = router