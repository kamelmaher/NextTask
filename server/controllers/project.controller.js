const Project = require("../models/project.model")
const Category = require("../models/category.model")
const { success, error, serverError } = require("../utils/responses")
const { MAIN_LIMIT } = require("../utils")
const { projectApprovalStatus } = require("../utils/status")

// Public Access
exports.getProjects = async (req, res) => {
    const page = req.query.page || 1
    const skip = (page - 1) * MAIN_LIMIT
    try {
        const projects = await Project.find()
            .limit(MAIN_LIMIT)
            .skip(skip)
            .populate("userId", "firstName lastName")
            .populate("categoryId", "title")
        const total = await Project.countDocuments()
        success(res, 200, { projects, total, totalPages: Math.ceil(total / MAIN_LIMIT) })
    } catch (err) {
        console.log(err)
        return serverError(res)
    }
}

exports.getSingleProject = async (req, res) => {
    const { id } = req.params
    if (!id) return error(res, 400, "id is required")
    try {
        const project = await Project.findById(id).populate("userId", "firstName lastName").populate("categoryId", "title")
        if (!project) return error(res, 404, "project not found")
        success(res, 200, { project })
    } catch (err) {
        serverError(res)
    }
}

// Employee Only
exports.createProject = async (req, res) => {
    const { title, desc, categoryId, minPrice, maxPrice, deliveryDuration } = req.body
    // const { _id } = req.user;
    // if (!_id) return error(res, 400, "user Id is required")
    const _id = "6a11d094317e8974831c015e"
    try {
        const foundCategory = await Category.findOne({ _id: categoryId })
        if (!foundCategory) return error(res, 404, "invalid category")
        const newProject = { title, desc, categoryId, minPrice, maxPrice, deliveryDuration, userId: _id }
        const project = await Project.create(newProject);
        success(res, 201, { msg: "project created succefully!", project });
    } catch (err) {
        console.log(err)
        return serverError(res)
    }
}

exports.updateProject = async (req, res) => {
    const projectId = req.params.id
    const { _id } = req.user;
    if (!_id) return error(res, 400, "user Id is required")
    if (!projectId) return error(res, 400, "project Id is required")
    // const _id = "6a11d094317e8974831c015e"
    const allowedFields = ["title", "desc", "minPrice", "maxPrice", "categoryId", "deliveryDuration"]
    try {
        // Check Ownership
        const oldProject = await Project.findById(projectId)
        if (!oldProject) return error(res, 404, "project not found")
        if (oldProject.userId.toString() !== _id.toString()) return error(res, 403, "you can’t update this project")

        const updateData = {};
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        // Check new category
        if (updateData.categoryId) {
            const foundCategory = await Category.findById(updateData.categoryId)
            if (!foundCategory) return error(res, 404, "invalid category")
        }

        const project = await Project.findByIdAndUpdate(projectId, updateData, { returnDocument: "after" }).populate("categoryId", "title")
        success(res, 200, { msg: "project updated succefully", project })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.deleteProject = async (req, res) => {
    const { id } = req.params
    // const { _id } = req.user;
    // if (!_id) return error(res, 400, "user Id is required")
    const _id = "6a11d094317e8974831c015e"
    if (!id) return error(res, 400, "projectId is required")
    try {
        const project = await Project.findByIdAndDelete(id)
        if (!project) return error(res, 404, "project not found")
        success(res, 200, "project deleted succefully")
    } catch (err) {
        console.log(err)
        serverError(err)
    }

}

// Moderators - Admins
exports.changeApproveStatus = async (req, res) => {
    const { id } = req.params
    const { approveStatus } = req.body
    try {
        const allowedStatuses = Object.values(projectApprovalStatus);
        if (!allowedStatuses.includes(approveStatus)) {
            return error(res, 400, "invalid status value");
        }
        const project = await Project.findByIdAndUpdate(id, { approveStatus }, { returnDocument: "after" })
        if (!project) return error(res, 404, "project not found")
        success(res, 200, { project })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}
