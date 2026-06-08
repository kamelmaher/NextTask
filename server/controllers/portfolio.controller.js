const Portfolio = require("../models/portfolio.model")
const { serverError, error, success } = require("../utils/responses")

const parseArrayField = (field) => {
    if (!field) return undefined
    if (Array.isArray(field)) return field
    try {
        return JSON.parse(field)
    } catch {
        return field.toString().split(",").map((item) => item.trim()).filter(Boolean)
    }
}

exports.getPortfolioItems = async (req, res) => {
    const userId = req.params.id || null
    if (!userId) return error(res, 400, "user is required")
    try {
        const portfolioItems = await Portfolio.find({ freelancer: userId }).sort({ createdAt: -1 })
        success(res, 200, { portfolioItems })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.getPortfolioItem = async (req, res) => {
    const itemId = req.params.id || null
    if (!itemId) return error(res, 400, "item id is required")
    try {
        const portfolioItem = await Portfolio.findById(itemId).populate("freelancer")
        if (!portfolioItem) return error(res, 400, "item not found")
        success(res, 200, { portfolioItem })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.createPortfolioItem = async (req, res) => {
    const { _id } = req.user
    if (!_id) return error(res, 403, "UnAuthorized")
    const { title, desc, skills, cover, images } = req.body
    try {
        const newItem = {
            title,
            desc,
            cover,
            images,
            skills: parseArrayField(skills),
            freelancer: _id
        }
        const portfolio = await Portfolio.create(newItem)
        if (!portfolio) return error(res, 400, "cant create portfolio item.")
        success(res, 201, { portfolioItem: portfolio })
    } catch (err) {
        console.log("ther error happened: ", err)
        serverError(res)
    }
}

exports.updatePortfolioItem = async (req, res) => {
    const itemId = req.params.id || null
    if (!itemId) return error(res, 400, "item id is required")
    const { _id } = req.user
    if (!_id) return error(res, 403, "UnAuthorized")
    const { title, desc, cover, images, skills } = req.body
    try {
        const portfolioItem = await Portfolio.findById(itemId)
        if (!portfolioItem) return error(res, 400, "item not found")
        if (portfolioItem.freelancer.toString() !== _id.toString()) return error(res, 403, "Not authorized")

        portfolioItem.title = title || portfolioItem.title
        portfolioItem.desc = desc || portfolioItem.desc
        portfolioItem.cover = cover || portfolioItem.cover
        portfolioItem.images = parseArrayField(images) || portfolioItem.images
        portfolioItem.skills = parseArrayField(skills) || portfolioItem.skills

        await portfolioItem.save()
        success(res, 200, { portfolioItem })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.deletePortfolioItem = async (req, res) => {
    const itemId = req.params.id || null
    if (!itemId) return error(res, 400, "item id is required")
    const { _id } = req.user
    if (!_id) return error(res, 403, "UnAuthorized")

    try {
        const portfolioItem = await Portfolio.findById(itemId)
        if (!portfolioItem) return error(res, 400, "item not found")
        if (portfolioItem.freelancer.toString() !== _id.toString()) return error(res, 403, "Not authorized")

        await portfolioItem.deleteOne()
        success(res, 200, { message: "Portfolio item deleted" })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

