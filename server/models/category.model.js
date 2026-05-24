const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
    }
}, { timestamps: true })

const Category = mongoose.model("category", categorySchema)
module.exports = Category