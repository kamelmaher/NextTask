const express = require("express")
const router = express.Router()
const { roles } = require("../utils")

// Controllers
const { login, signUp, updateProfile, assignRole, removeRole, me, logout, getUsers, getAdminUsers } = require("../controllers/user.controller")

// Middlewares
const verifyToken = require("../middlewares/verifyToken")
const allowedTo = require("../middlewares/allowedTo")
const validate = require("../middlewares/validate")

// validators
const { loginValidator, userDetailsValidator } = require("../validators/user")


// Public
router.post("/login", validate(loginValidator), login)
router.post("/signup", validate(userDetailsValidator), signUp)
router.post("/logout", logout)
router.get("/", getUsers)

// Signed Users 
router.use(verifyToken)
router.patch("/", validate(userDetailsValidator), updateProfile)
router.get("/me", me)

// Admins
router.patch("/:id/roles/assign", allowedTo(roles.ADMIN), assignRole)
router.patch("/:id/roles/remove", allowedTo(roles.ADMIN), removeRole)
router.get("/admin", allowedTo(roles.MANAGER), getAdminUsers)
module.exports = router