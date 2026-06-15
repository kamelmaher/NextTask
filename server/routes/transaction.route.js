const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const { getTransactions } = require("../controllers/transaction.controller");

router.get("/", verifyToken, allowedTo("admin"), getTransactions);

module.exports = router;
