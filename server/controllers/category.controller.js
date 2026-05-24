const Category = require("../models/category.model");
const { MAIN_LIMIT } = require("../utils");
const { serverError, error, success } = require("../utils/responses");

// Public Access
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        success(res, 200, { categories })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

// Admins and Moderators
exports.createCategory = async (req, res) => {
    const { title, icon } = req.body;
    try {
        const foundCategory = await Category.findOne({ title })
        if (foundCategory) return error(res, 400, "category already exists")
        const category = await Category.create({ title, icon: icon || "" })
        success(res, 201, { msg: "category created succefully", category })
    } catch (err) {
        console.log(err)
        return serverError(res)
    }
}

exports.updateCategory = async (req, res) => {
    const { id } = req.params
    const { title } = req.body
    if (!id) return error(res, 400, "category id is required")
    try {
        const category = await Category.findByIdAndUpdate(id, { title }, { returnDocument: "after" })
        if (!category) return error(res, 400, "category not found")
        success(res, 200, { msg: "category updated Succefully", category })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.deleteCategory = async (req, res) => {
    const { id } = req.params
    if (!id) return error(res, 400, "category id is required")
    try {
        const category = await Category.findByIdAndDelete(id)
        if (!category) return error(res, 400, "category not found")
        success(res, 200, { msg: "category deleted succefully" })
    } catch (err) {
        console.log(err)
        return serverError(res)
    }
}