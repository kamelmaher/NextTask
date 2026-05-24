const jwt = require("jsonwebtoken")
const { serverError, error } = require("../utils/responses")

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) return error(res, 403, "Token Required")
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (user) {
            req.user = user
            return next()
        }
        return error(res, 403, "Inavlid Token")
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}