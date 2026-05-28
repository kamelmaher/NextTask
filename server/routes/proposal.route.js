const router = require("express").Router()

// Controllers
const { getProposals, createProposal } = require("../controllers/proposal.controller")

// Middlewares
const verifyToken = require("../middlewares/verifyToken")
const allowedTo = require("../middlewares/allowedTo")

router.get("/:id", getProposals)

router.post("/:id", verifyToken, createProposal)

module.exports = router