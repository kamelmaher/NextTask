const mongoose = require("mongoose")
const { projectStatus, projectApprovalStatus } = require("../utils/status")

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "category",
        required: true
    },
    employerId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    minPrice: {
        type: Number,
        required: true,
    },
    maxPrice: {
        type: Number,
        required: true
    },
    deliveryDuration: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: [projectStatus.OPEN, projectStatus.DECLINED, projectStatus.FINISHED, projectStatus.INPROGRESS],
        default: projectStatus.OPEN
    },
    approveStatus: {
        type: String,
        enum: [projectApprovalStatus.ACCEPTED, projectApprovalStatus.DECLINED, projectApprovalStatus.PENDING],
        default: projectApprovalStatus.PENDING
    }
}, { timestamps: true })


const Project = mongoose.model("project", projectSchema)
module.exports = Project