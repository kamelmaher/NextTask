const Transaction = require("../models/transaction.model")
const { success, error, serverError } = require("../utils/responses")
const { transactionTypes } = require("../utils")

exports.getTransactions = async (req, res) => {
    const { type } = req.query
    const validTypes = [
        transactionTypes.DEPOSIT,
        transactionTypes.WITHDRAW,
        transactionTypes.TRANSFER,
    ]

    const filter = {}
    if (type) {
        if (!validTypes.includes(type)) {
            return error(res, 400, "Invalid transaction type")
        }
        filter.type = type
    }

    try {
        const transactions = await Transaction.find(filter)
            .sort({ createdAt: -1 })
            .populate("user", "firstName lastName")
            .populate("fromUser", "firstName lastName")
            .populate("toUser", "firstName lastName")
            .populate([{
                path: "contract",
                populate: {
                    path: "project",
                    select: "title"
                }
            }
            ])

        success(res, 200, { transactions })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}