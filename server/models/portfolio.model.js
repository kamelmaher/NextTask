const mongoose = require("mongoose")

const portfolioItemSchema = new mongoose.Schema({
    freelancer: { type: mongoose.Schema.ObjectId, ref: "user" },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    images: Array,
    skills: Array
}, { timestamps: true })

const Portfolio = mongoose.model("portfolio-items", portfolioItemSchema)
module.exports = Portfolio
