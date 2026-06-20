const roles = {
    ADMIN: "admin",
    USER: "user",
}

const mainPriceRange = {
    MIN_PRICE_RANGE: 50,
    MAX_PRICE_RANGE: 10000
}

const MAIN_LIMIT = 15

const userAllowedFields = ["firstName", "lastName", "userName", "email", "password", "about", "title", "profileImage", "categoryId"]

const transactionTypes = {
    DEPOSIT: "deposit",
    WITHDRAW: "withdraw",
    TRANSFER: "transfer"
}
const transactionStatus = {
    COMPLETED: "completed",
    INPROGRESS: "inprogress",
    CANCELLED: "cancelled"
}
module.exports = {
    roles,
    mainPriceRange,
    MAIN_LIMIT,
    userAllowedFields,
    transactionTypes,
    transactionStatus
}