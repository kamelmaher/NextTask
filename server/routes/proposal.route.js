const router = require("express").Router()
const { roles } = require("../utils")

// Controllers
const { createProposal, acceptProposal, getProposalsByProject, getProposalsByFreelancer } = require("../controllers/proposal.controller")

// Middlewares
const verifyToken = require("../middlewares/verifyToken")
const allowedTo = require("../middlewares/allowedTo")

router.get("/project/:projectId", getProposalsByProject)

router.use(verifyToken)

router.post("/", createProposal)
router.get("/freelancer", getProposalsByFreelancer)
// :id is a proposal id
router.patch("/:id", acceptProposal)

module.exports = router