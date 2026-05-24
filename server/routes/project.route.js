const express = require("express")
const router = express.Router()
const { roles } = require("../utils")

// Controllers
const { getProjects, getSingleProject, createProject, updateProject, deleteProject, changeApproveStatus } = require("../controllers/project.controller")

// middlewares
const verifyToken = require("../middlewares/verifyToken")
const allowedTo = require("../middlewares/allowedTo")
const validate = require("../middlewares/validate")
const { createProjectValidator, updateProjectValidator } = require("../validators/project")

// Public
router.get("/", getProjects)
router.get("/:id", getSingleProject)

router.use(verifyToken)

// For Employee only
router.post("/", allowedTo(roles.EMPLOYER), validate(createProjectValidator), createProject)
router.patch("/:id", allowedTo(roles.EMPLOYER), validate(updateProjectValidator), updateProject)
router.delete("/:id", allowedTo(roles.EMPLOYER), deleteProject)

// For Moderators 
router.patch("/:id/approve-status", allowedTo(roles.MODERATOR, roles.ADMIN), changeApproveStatus)

module.exports = router