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
    status: {
        type: String,
        enum: [contractStatus.ACCEPTED, contractStatus.DECLINED, contractStatus.INPROGRESS, contractStatus.SUBMITED],
        default: contractStatus.INPROGRESS
    },
    submittedAt: {
        type: Date
    }
}, { timestamps: true })

const Contract = mongoose.model("contract", contractSchema)