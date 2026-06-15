const mongoose = require("mongoose")
const { transactionStatus } = require("../utils/status")
const { transactionTypes } = require("../utils")

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [transactionTypes.DEPOSITE, transactionTypes.TRANSFER, transactionTypes.WITHDRAW],
        required: true
    },
    status: {
        type: String,
        enum: [transactionStatus.COMPLETED, transactionStatus.DECLINED, transactionStatus.PENDING],
        default: transactionStatus.PENDING
    },
    amount: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: null
    },
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    stripeSessionId: {
        type: String,
        default: null,
    },
    contractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contract",
        default: null
    }
})

const Transaction = mongoose.Model("transaction", transactionSchema)
module.exports = Transaction