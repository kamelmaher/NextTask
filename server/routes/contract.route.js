const router = require("express").Router()
const { roles } = require("../utils")

// controllers
const { submitWork, acceptSubmission, requestRevision, getContract, getContracts } = require("../controllers/contract.controller")

// middlewares
const verifyToken = require("../middlewares/verifyToken")
const allowedTo = require("../middlewares/allowedTo")
const upload = require("../middlewares/upload")

router.use(verifyToken)

// users
router.use(allowedTo(roles.USER))
router.get("/", getContracts)
router.get("/:id", getContract)
router.post("/:id", upload.array("files"), submitWork)
router.post("/:id/accept", acceptSubmission)
router.post("/:id/request-revision", requestRevision)

module.exports = router