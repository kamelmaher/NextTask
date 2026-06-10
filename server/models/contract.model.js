const mongoose = require("mongoose")
const { contractStatus } = require("../utils/status")

const contractSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.ObjectId,
        ref: "project"
    },
    proposal: {
        type: mongoose.Schema.ObjectId,
        ref: "proposal"
    },
    employer: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    freelancer: {
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

    submissions: [{
        files: [{ originalName: String, fileName: String, mimeType: String, path: String, size: Number }],
        message: String,
        submittedAt: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: [contractStatus.FINISHED, contractStatus.DECLINED, contractStatus.INPROGRESS, contractStatus.SUBMITTED],
        default: contractStatus.INPROGRESS
    },
}, { timestamps: true })

const Contract = mongoose.model("contract", contractSchema)
module.exports = Contract