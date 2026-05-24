const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const { success, error, serverError } = require("../utils/responses")
const jwt = require("jsonwebtoken")

const generateToken = async (user) => {
    const data = { roles: user.roles, _id: user._id, email: user.email }
    const token = await jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "10d" })
    return token
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return error(res, 400, "Invalid Credintials")
        const userPassword = user.password
        const isMatched = await bcrypt.compare(password, userPassword)
        if (!isMatched) return error(res, 400, "Invalid Credintials")
        const token = await generateToken(user)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        success(res, 200, { token })
    } catch (err) {
        serverError(res)
    }
}

exports.signUp = async (req, res) => {
    const data = req.body
    try {
        const emailFound = await User.findOne({ email: data.email })
        if (emailFound) return error(res, 400, "Email already in use.")
        const hashedPass = await bcrypt.hash(data.password, 9)
        const newUser = await User.create({ ...data, password: hashedPass })
        const token = await generateToken(newUser)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        success(res, 201, { token })
    } catch (err) {
        return serverError(res)
    }
}

exports.logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    success(res, 200, { msg: "Logout Succefully" })
}

exports.updateProfile = async (req, res) => {
    const { _id } = req.user
    if (!_id) return error(res, 401, "Unauthorizd")
    const allowedFields = ["firstName", "lastName", "email", "password", "about", "title", "profileImage"]
    const updateData = {};
    try {
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password , 9)
        }

        const user = await User.findByIdAndUpdate(_id, updateData, { returnDocument: "after" })
        if (!user) return error(res, 400, "user not found")

        success(res, 200, { msg: "user updated Succefully", user })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}