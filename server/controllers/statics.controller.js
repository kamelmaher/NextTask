const User = require("../models/user.model")
const Project = require("../models/project.model")
const Contract = require("../models/contract.model")
const Proposal = require("../models/proposal.model")
const Transaction = require("../models/transaction.model")
const mongoose = require("mongoose")
const { serverError, error, success } = require("../utils/responses")
const { contractStatus, projectStatus, proposalStatus, projectApprovalStatus, transactionStatus } = require("../utils/status")
const { transactionTypes } = require("../utils")

exports.getUserStatics = async (req, res) => {
    const { _id } = req.user
    if (!_id) return error(res, 401, "UnAuthorized")
    try {
        const [
            postedProjects,
            proposalsCount,
            finishedContracts,
            inProgress,
            pendingProposals
        ] = await Promise.all([
            Project.countDocuments({ employer: _id }),

            Proposal.countDocuments({ freelancer: _id }),

            Contract.aggregate([
                {
                    $match: {
                        freelancer: new mongoose.Types.ObjectId(_id),
                        status: contractStatus.ACCEPTED
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalEarned: { $sum: "$agreedPrice" },
                        finishedWork: { $sum: 1 }
                    }
                }
            ]),

            Project.countDocuments({
                freelancer: _id,
                status: projectStatus.INPROGRESS
            }),

            Proposal.countDocuments({
                freelancer: _id,
                status: proposalStatus.PENDING
            })
        ]);
        const totalEarned = finishedContracts[0]?.totalEarned || 0;
        const finishedWork = finishedContracts[0]?.finishedWork || 0;

        success(res, 200, {
            postedProjects,
            proposalsCount,
            totalEarned,
            finishedWork,
            inProgress,
            pendingProposals
        });
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.getAdminStatics = async (req, res) => {
    const { _id } = req.user
    if (!_id) return error(res, 401, "UnAuthorized")
    try {
        const [
            totalUsers,

            // projects
            totalProjects,
            activeProjects,
            pendingProjects,
            completedProjects,

            // contracts
            totalContracts,
            inProgress,
            completed,
            declined,
            totalValue,

            // activity 
            recentProjects,
            recentContracts,
            recentDeposits,

            // pending Actions
            pendingWithdrawalsAction
        ] = await Promise.all([
            User.countDocuments(),

            // projects
            Project.countDocuments(),
            Project.countDocuments({
                status: {
                    $in: [projectStatus.OPEN, projectStatus.INPROGRESS]
                },
                approveStatus: projectApprovalStatus.ACCEPTED
            }),
            Project.countDocuments({ approveStatus: projectApprovalStatus.PENDING }),
            Project.countDocuments({ status: projectStatus.FINISHED }),

            // contracts
            Contract.countDocuments(),
            Contract.countDocuments({
                status: {
                    $in: [
                        contractStatus.INPROGRESS,
                        contractStatus.SUBMITTED
                    ]
                }
            }),
            Contract.countDocuments({ status: contractStatus.ACCEPTED }),
            Contract.countDocuments({ status: contractStatus.DECLINED }),
            Contract.aggregate([
                {
                    $match: {
                        status: contractStatus.ACCEPTED
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalValue: { $sum: "$agreedPrice" },
                    }
                }
            ]),

            // activity
            Project.find().sort({ createdAt: -1 }).limit(5).populate("employer", "firstName lastName"),
            Contract.find({}).sort({ createdAt: -1 })
                .limit(5)
                .populate("employer", "firstName lastName")
                .populate("project", "title")
                .populate("freelancer", "firstName lastName"),
            Transaction.find({ type: transactionTypes.DEPOSIT, status: transactionStatus.COMPLETED })
                .sort({ createdAt: -1 })
                .limit(5)
                .populate("user", "firstName lastName"),

            // pending actions
            Transaction.countDocuments({ type: transactionTypes.WITHDRAW, status: transactionStatus.PENDING })
        ])
        const contractTotalValue = totalValue[0].totalValue

        const projectStatics = {
            totalProjects,
            activeProjects,
            pendingProjects,
            completedProjects
        }

        const contractStatics = {
            totalContracts,
            inProgress,
            completed,
            declined,
            totalValue: contractTotalValue
        }

        const activity = {
            recentProjects,
            recentContracts,
            recentDeposits
        }

        const pendingActions = {
            pendingWithdrawalsAction
        }
        success(res, 200, {
            totalUsers,
            projectStatics,
            contractStatics,
            activity,
            pendingActions
        })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.getPaymentStatics = async (req, res) => {
    const { _id } = req.user
    if (!_id) return error(res, 401, "UnAuthorized")

    try {
        const [
            deposites,
            withdrawals,
            transfersValue
        ] = await Promise.all([
            Transaction.aggregate([
                {
                    $match: {
                        type: transactionTypes.DEPOSIT
                    }
                },
                {
                    $group: {
                        _id: null,
                        value: { $sum: "$amount" },
                        total: { $sum: 1 }
                    }
                }
            ]),
            Transaction.aggregate([
                {
                    $match: {
                        type: transactionTypes.WITHDRAW
                    }
                },
                {
                    $group: {
                        _id: null,
                        value: { $sum: "$amount" },
                        total: { $sum: 1 }
                    }
                }
            ]),
            Transaction.aggregate([
                {
                    $match: {
                        type: transactionTypes.TRANSFER
                    }
                },
                {
                    $group: {
                        _id: null,
                        value: { $sum: "$amount" },
                    }
                }
            ]),

        ])
        const depositTotal = deposites[0]?.total
        const depositValue = deposites[0]?.value

        const withdrawsTotal = withdrawals[0]?.total
        const withdrawsValue = withdrawals[0]?.value

        const totalTransfers = transfersValue[0]?.value

        success(res, 200,
            { depositTotal, depositValue, withdrawsTotal, withdrawsValue, totalTransfers }
        )
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}



