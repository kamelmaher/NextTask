const express = require("express")
const router = express.Router()
const { roles } = require("../utils")

// Controllers
const { getProjects, getSingleProject, createProject, updateProject, deleteProject, changeApproveStatus, getAdminProjects } = require("../controllers/project.controller")

// middlewares
const verifyToken = require("../middlewares/verifyToken")
const allowedTo = require("../middlewares/allowedTo")
const validate = require("../middlewares/validate")
const { createProjectValidator, updateProjectValidator } = require("../validators/project")

// Public
router.get("/", getProjects)
router.get("/admin", verifyToken, allowedTo(roles.MODERATOR, roles.ADMIN), getAdminProjects)
router.get("/:id", getSingleProject)

router.use(verifyToken)

// For Moderators 
router.patch("/:id/approve-status", allowedTo(roles.MODERATOR, roles.ADMIN), changeApproveStatus)

// For users only
router.use(allowedTo(roles.USER))
router.post("/", validate(createProjectValidator), createProject)
router.patch("/:id", validate(updateProjectValidator), updateProject)
router.delete("/:id", deleteProject)


module.exports = router