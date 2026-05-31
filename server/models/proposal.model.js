const mongoose = require("mongoose")
const { proposalStatus } = require("../utils/status")

const proposalSchema = mongoose.Schema({
    project: {
        type: mongoose.Schema.ObjectId,
        ref: "project",
        required: true
    },
    freelancer: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    deliveryDuration: {
        type: Number,
        required: true
    },
    files: {
        type: [{ type: mongoose.Schema.ObjectId, ref: "file" }]
    },
    status: {
        type: String,
        enum: [proposalStatus.ACCEPTED, proposalStatus.DECLINED, proposalStatus.PENDING],
        default: proposalStatus.PENDING
    }
}, { timestamps: true })

const Proposal = mongoose.model("proposal", proposalSchema)
module.exports = Proposal;
