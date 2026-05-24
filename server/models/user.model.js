const mongoose = require("mongoose");
const { roles } = require("../utils/index");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
    },
    title: {
        type: String,
    },
    profileImage: {
        type: String
    },
    roles: {
        type: [String],
        enum: [
            roles.ADMIN,
            roles.MODERATOR,
            roles.EMPLOYER,
            roles.FREELANCER
        ],
        default: [roles.FREELANCER]
    }
}, { timestamps: true })

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    const roles = Array.isArray(userObject.roles)
        ? userObject.roles
        : [];

    if (!roles.includes(roles.ADMIN)) {
        delete userObject.updatedAt;
        delete userObject.__v;
    }

    delete userObject.password;
    return userObject;
};

const User = mongoose.model("user", userSchema)
module.exports = User