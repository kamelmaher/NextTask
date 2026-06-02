const Project = require("../models/project.model")
const Category = require("../models/category.model")
const { success, error, serverError } = require("../utils/responses")
const { MAIN_LIMIT } = require("../utils")
const { projectApprovalStatus, projectStatus } = require("../utils/status")

// Public Access
exports.getProjects = async (req, res) => {
    const page = req.query.page || 1
    const skip = (page - 1) * MAIN_LIMIT
    const {
        searchTerm,
        categoryId,
        minPrice,
        maxPrice,
        employer,
        status,
    } = req.query || {};

    let filters = {}
    if (!employer)
        filters = { status: projectStatus.OPEN, approveStatus: projectApprovalStatus.ACCEPTED };

    if (searchTerm) {
        filters.title = {
            $regex: searchTerm,
            $options: "i",
        };
    }

    if (categoryId) {
        filters.category = categoryId;
    }

    if (minPrice || maxPrice) {

        if (minPrice) {
            filters.minPrice.$gte = Number(minPrice);
        }

        if (maxPrice) {
            filters.maxPrice.$lte = Number(maxPrice);
        }
    }

    if (employer) {
        filters.employer = employer
    }

    try {
        const projects = await Project.find(filters).populate("employer", "firstName lastName").populate("category", "title").populate("contract").sort({ createdAt: -1 }).skip(skip).limit(MAIN_LIMIT);
        const total = await Project.countDocuments(filters)
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
        const project = await Project.findById(id).populate("employer", "firstName lastName").populate("category", "title")
        if (!project) return error(res, 404, "project not found")
        success(res, 200, { project })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

// user Only
exports.createProject = async (req, res) => {
    const { title, desc, category, minPrice, maxPrice, deliveryDuration } = req.body
    const { _id } = req.user;
    if (!_id) return error(res, 400, "user Id is required")
    // const _id = "6a11d094317e8974831c015e"
    try {
        const foundCategory = await Category.findOne({ _id: category })
        if (!foundCategory) return error(res, 404, "invalid category")
        const newProject = { title, desc, category, minPrice, maxPrice, deliveryDuration, employer: _id }
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
    const allowedFields = ["title", "desc", "minPrice", "maxPrice", "category", "deliveryDuration"]
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

        const project = await Project.findByIdAndUpdate(projectId, updateData, { returnDocument: "after" })

        success(res, 200, { project })
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
        success(res, 200, { project })
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
