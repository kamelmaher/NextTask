const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const { success, error, serverError } = require("../utils/responses")
const jwt = require("jsonwebtoken")
const { roles, userAllowedFields, MAIN_LIMIT } = require("../utils")

// helpers
const generateToken = async (user) => {
    const data = { roles: user.roles, _id: user._id, email: user.email }
    const token = await jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "10d" })
    return token
}

const setCookies = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

};

// Public
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return error(res, 400, "check email or password")
        const userPassword = user.password
        const isMatched = await bcrypt.compare(password, userPassword)
        if (!isMatched) return error(res, 400, "check email or password")
        const token = await generateToken(user)
        setCookies(res, token)
        success(res, 200, { user })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.signUp = async (req, res) => {
    try {
        const registerData = {};
        userAllowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                registerData[field] = req.body[field];
            }
        });

        const emailFound = await User.findOne({ email: registerData.email })
        if (emailFound) return error(res, 400, "Email already in use.")
        const hashedPass = await bcrypt.hash(registerData.password, 9)
        const newUser = await User.create({ ...registerData, password: hashedPass })
        const token = await generateToken(newUser)
        setCookies(res, token)
        success(res, 201, { user: newUser })
    } catch (err) {
        console.log(err)
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

exports.me = async (req, res) => {
    const { _id } = req.user
    if (!_id) return error(res, 404, "user not found")
    try {
        const user = await User.findById(_id)
        success(res, 200, { user })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.getUsers = async (req, res) => {
    const page = req.query.page || 1
    const skip = (page - 1) * MAIN_LIMIT
    const { role } = req.body
    try {
        let filterRoles;
        const allowedRoles = [roles.USER];
        const notAllowedRoles = [roles.ADMIN];
        if (!role) {
            filterRoles = allowedRoles;
        } else {
            // validate role
            if (!allowedRoles.includes(role)) {
                return error(res, 400, "invalid role");
            }
            filterRoles = [role];
        }

        const users = await User.find({
            roles: { $in: filterRoles, $nin: notAllowedRoles }
        })
            .limit(MAIN_LIMIT)
            .skip(skip);

        return success(res, 200, { users });
    } catch (err) {
        console.log(err);
        return serverError(res);
    }
}

// Signed Users
exports.updateProfile = async (req, res) => {
    const { _id } = req.user
    if (!_id) return error(res, 401, "Unauthorizd")
    console.log(req.body)
    try {
        const updateData = {};
        userAllowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 9)
        }

        const user = await User.findByIdAndUpdate(_id, updateData, { returnDocument: "after" })
        if (!user) return error(res, 400, "user not found")

        success(res, 200, { msg: "user updated Succefully", user })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

// Admins
exports.toggleRole = async (req, res) => {
    const { id } = req.params
    const { role } = req.body
    const adminId = req.user._id
    if (!adminId) return error(res, 401, "unAuthorized")
    try {
        const user = await User.findById(id)
        if (!user) return error(res, 404, "User not found")

        // check if allowed role
        const allowedRoles = Object.values(roles);
        if (!allowedRoles.includes(role)) {
            return error(res, 400, "invalid role value");
        }

        const userRoles = user.roles || []
        let newRoles = []
        // if has the role 
        if (userRoles.includes(role))
            // if roles more than one 
            if (userRoles.length > 1) {
                newRoles = userRoles.filter(userRole => role !== userRole)
                const newUser = await User.findByIdAndUpdate(id, { roles: newRoles }, { returnDocument: "after" })
                return success(res, 200, { msg: "role removed Succefully", user: newUser })
            }
            else return error(res, 400, "user should have one role at least")

        newRoles = [...userRoles, role]
        const newUser = await User.findByIdAndUpdate(id, { roles: newRoles }, { returnDocument: "after" })
        success(res, 200, { msg: "role added Succefully", user: newUser })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.getAdminUsers = async (req, res) => {
    const user = req.user
    if (!user) return error(res, 403, "unauthorized")
    const page = req.query.page || 1
    const skip = (page - 1) * MAIN_LIMIT
    const role = req.query.role || null
    let filters = {}
    if (role) filters.roles = role
    try {
        const users = await User.find().limit(MAIN_LIMIT).skip(skip).sort({ createdAt: -1 })
        success(res, 200, { users })
    } catch (err) {
        serverError(res)
    }
}

exports.deleteUser = async (req, res) => {
    const { _id } = req.user
    if (!_id) return error(res, 400, "UnAuthorized")
    const userId = req.params.id || null
    if (!userId) return error(res, 400, "user id is required")
    if (userId.toString() === _id.toString()) return error(res, 400, "cant delete yourself")
    try {
        const deleted = await User.findByIdAndDelete(userId)
        if (!deleted) return error(res, 404, "uesr not found")
        success(res, 200, { user: deleted })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}