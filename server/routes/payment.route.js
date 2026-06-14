const router = require("express").Router()

const { deposite } = require("../controllers/payment.controller")
const verifyToken = require("../middlewares/verifyToken")

router.post("/create-checkout-session", verifyToken, deposite)
router.post("/dposite", verifyToken, deposite)

module.exports = router