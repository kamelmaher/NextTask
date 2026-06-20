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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: null
    },
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: null
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: null
    },
    stripeSessionId: {
        type: String,
        default: null,
    },
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contract",
        default: null
    }
}, { timestamps: true })

transactionSchema.index({ type: 1, status: 1 });
transactionSchema.index({ createdAt: -1 });

const Transaction = mongoose.model("transaction", transactionSchema)
module.exports = Transaction