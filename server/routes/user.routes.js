const express = require("express")
const router = express.Router()

const { login, signUp, updateProfile } = require("../controllers/user.controller")

const verifyToken = require("../middlewares/verifyToken")

router.post("/login", login)
router.post("/signup", signUp)
router.put("/", verifyToken, updateProfile)
module.exports = router