const mongoose = require("mongoose")
const { contractStatus } = require("../utils/status")

const contractSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.ObjectId,
        ref: "project"
    },
    proposalId: {
        type: mongoose.Schema.ObjectId,
        ref: "proposal"
    },
    employerId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    freelancerId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    agreedPrice: {
        type: Number,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    Submission: {
        files: [{ type: mongoose.Schema.ObjectId, ref: "file" }],
        submittedAt: Date
    },
    status: {
        type: String,
        enum: [contractStatus.ACCEPTED, contractStatus.DECLINED, contractStatus.INPROGRESS, contractStatus.SUBMITTED],
        default: contractStatus.INPROGRESS
    },
}, { timestamps: true })

const Contract = mongoose.model("contract", contractSchema)
module.exports = Contract