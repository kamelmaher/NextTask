const rateLimit = require("express-rate-limit")
const { ipKeyGenerator } = require("express-rate-limit")
const { error } = require("../utils/responses")

const limitHandler = (req, res) => error(res, 429, "too many requests, please try again later")
const keyByUser = (req) => req.user?._id?.toString() || ipKeyGenerator(req.ip)

exports.apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
    handler: limitHandler,
})

exports.authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: limitHandler,
    keyGenerator: (req) => `${ipKeyGenerator(req.ip)}:${req.body?.email || ""}`,
})

exports.aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 8,
    standardHeaders: true,
    legacyHeaders: false,
    handler: limitHandler,
    keyGenerator: keyByUser,
})

exports.paymentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: limitHandler,
    keyGenerator: keyByUser,
})

exports.uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    handler: limitHandler,
    keyGenerator: keyByUser,
})