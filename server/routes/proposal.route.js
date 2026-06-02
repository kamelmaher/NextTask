const router = require("express").Router()
const { roles } = require("../utils")

// Controllers
const { getProposals, createProposal, acceptProposal } = require("../controllers/proposal.controller")

// Middlewares
const verifyToken = require("../middlewares/verifyToken")
const allowedTo = require("../middlewares/allowedTo")

router.get("/", getProposals)

router.use(verifyToken)
router.post("/", createProposal)
// :id is a proposal id
router.patch("/:id", allowedTo(roles.USER), acceptProposal)

module.exports = router