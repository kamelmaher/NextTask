const express = require("express")
const router = express.Router()
const { roles } = require("../utils")

// Controllers
const { createCategory, updateCategory, deleteCategory, getCategories } = require("../controllers/category.controller")

// Middlewares
const verifyToken = require("../middlewares/verifyToken")
const allowedTo = require("../middlewares/allowedTo")
const validate = require("../middlewares/validate")
const { createCategoryValidator, updateCategoryValidator } = require("../validators/category")

// Public
router.get("/", getCategories)

router.use(verifyToken)

// Admins 
router.use(allowedTo(roles.ADMIN))

router.post("/", validate(createCategoryValidator), createCategory)
router.patch("/:id", validate(updateCategoryValidator), updateCategory)
router.delete("/:id", deleteCategory)

module.exports = router