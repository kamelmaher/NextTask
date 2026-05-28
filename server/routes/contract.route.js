const router = require("express").Router()
const { roles } = require("../utils")

// controllers
const { submitWork, acceptSubmission, requestRevision } = require("../controllers/contract.controller")

// middlewares
const verifyToken = require("../middlewares/verifyToken")
const allowedTo = require("../middlewares/allowedTo")

router.use(verifyToken)

// freelancers
router.post("/:id", allowedTo(roles.FREELANCER), submitWork)

// employers
router.use(allowedTo(roles.EMPLOYER))
router.post("/:id/accept", acceptSubmission)
router.post("/:id/request-revision", requestRevision)

module.exports = router