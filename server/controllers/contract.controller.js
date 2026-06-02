const Contract = require("../models/contract.model")
const Project = require("../models/project.model")
const { serverError, error, success } = require("../utils/responses")
const { contractStatus, projectStatus } = require("../utils/status")

exports.getContract = async (req, res) => {
    const contractId = req.params.id
    if (!contractId) return error(res, 400, "contract not found")
    try {
        const contract = await Contract.findById(contractId).populate("project").populate("employer", "firstName lastName").populate("freelancer", "firstName lastName title")
        if (!contract) return error(res, 404, "contract not found")
        success(res, 200, { contract })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.submitWork = async (req, res) => {
    const freelancer = req.user
    if (!freelancer) return error(res, 400, "freelancer not found")

    const contractId = req.params.id
    if (!contractId) return error(res, 400, "contract not found")

    const { files, message } = req.body || {}
    try {
        const contract = await Contract.findById(contractId)
        if (!contract) return error(res, 404, "contract not found")

        // check if contract is in progress
        if (contract.status !== contractStatus.INPROGRESS)
            return error(res, 400, "the contract is closed")

        // check if freelancer is in the contract
        if (contract.freelancerId.toString() !== freelancer._id.toString())
            return error(res, 403, "cant submit work for this project")

        // update contract
        contract.submission = { message, files, submittedAt: new Date() }
        contract.status = contractStatus.SUBMITTED
        await contract.save()
        success(res, 200, { contract })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.acceptSubmission = async (req, res) => {
    const contractId = req.params.id
    if (!contractId) return error(res, 400, "contract not found")
    const employer = req.user
    if (!employer) return error(res, 403, "unauthorized")
    try {
        const contract = await Contract.findById(contractId)
        if (!contract) return error(res, 404, "contract not found")

        // check if contract submitted
        if (contract.status !== contractStatus.SUBMITTED)
            return error(res, 400, "contract has no submissions")

        // check if employer is in the contract
        if (contract.employer.toString() !== employer._id.toString())
            return error(res, 403, "cant accept submissions for this project")

        // update project
        const project = await Project.findById(contract.project)
        if (!project) return error(res, 400, "cant update project status")
        project.status = projectStatus.FINISHED
        await project.save()

        // update contract
        contract.status = contractStatus.FINISHED
        await contract.save()
        success(res, 200, { contract, project })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.requestRevision = async (req, res) => {
    const contractId = req.params.id
    if (!contractId) return error(res, 400, "contract not found")
    const employer = req.user
    if (!employer) return error(res, 403, "unauthorized")
    try {
        const contract = await Contract.findById(contractId)
        if (!contract) return error(res, 404, "contract not found")

        // check if contract submitted
        if (contract.status !== contractStatus.SUBMITTED)
            return error(res, 400, "contract has no submissions")

        // check if employer is in the contract
        if (contract.employerId.toString() !== employer._id.toString())
            return error(res, 403, "cant accept submissions for this project")

        contract.status = contractStatus.INPROGRESS
        await contract.save()
        success(res, 200)
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}