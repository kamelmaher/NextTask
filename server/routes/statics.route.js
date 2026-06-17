const router = require("express").Router()

const verifyToken = require("../middlewares/verifyToken")
const allowedTo = require("../middlewares/allowedTo")
const { getUserStatics, getAdminStatics, getPaymentStatics } = require("../controllers/statics.controller")
const { roles } = require("../utils")

router.use(verifyToken)
router.get("/user", getUserStatics)
router.use(allowedTo(roles.ADMIN))
router.get("/admin", getAdminStatics)
router.get("/transactions", getPaymentStatics)

module.exports = router