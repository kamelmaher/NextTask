const Contract = require("../models/contract.model")
const Project = require("../models/project.model")
const { serverError, error, success } = require("../utils/responses")
const { contractStatus, projectStatus } = require("../utils/status")

exports.getContracts = async (req, res) => {
    const { _id } = req.user
    if (!_id) return error(res, 400, "user not found")
    const { status, freelancer, employer } = req.query || {}
    const filters = {}
    if (freelancer)
        filters.freelancer = freelancer
    if (employer)
        filters.employer = employer
    if (status) {
        filters.status = status
    }
    try {
        const contracts = await Contract.find(filters).sort({ createdAt: -1 }).populate({
            path: "project",
            populate: {
                path: "employer",
                select: "firstName lastName"
            }
        }).populate("freelancer", "firstName lastName title")

        success(res, 200, { contracts })
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

exports.getContract = async (req, res) => {
    const contractId = req.params.id
    if (!contractId) return error(res, 400, "contract not found")
    try {
        const contract = await Contract.findById(contractId).populate({
            path: "project",
            populate: {
                path: "employer",
                select: "firstName lastName"
            }
        }).populate("freelancer", "firstName lastName title")
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
    const { message } = req.body || {}

    try {
        const files = req.files
        let formattedFiles
        if (files)
            formattedFiles = files.map(file => ({
                originalName: file.originalname,
                filename: file.filename,
                path: `/uploads/${file.filename}`,
                mimetype: file.mimetype,
                size: file.size
            }));
        const contract = await Contract.findById(contractId)
        if (!contract) return error(res, 404, "contract not found")

        // check if contract is in progress
        if (contract.status !== contractStatus.INPROGRESS)
            return error(res, 400, "the contract is closed")

        // check if freelancer is in the contract
        if (contract.freelancer.toString() !== freelancer._id.toString())
            return error(res, 403, "cant submit work for this project")

        // update contract
        contract.submissions = [...contract.submissions, { message, files: formattedFiles, submittedAt: new Date() }]
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
        // if (contract.status !== contractStatus.SUBMITTED)
        //     return error(res, 400, "contract has no submissions")

        // check if employer is in the contract
        if (contract.employer.toString() !== employer._id.toString())
            return error(res, 403, "cant accept submissions for this project")

        // update project
        const updatedProject = await Project.findByIdAndUpdate(contract.project, {
            status: projectStatus.FINISHED
        }, { returnDocument: "after" })
        if (!updatedProject) return error(res, 400, "cant update project status")

        // project.status = projectStatus.FINISHED
        // const updatedProject = await project.save()

        // update contract
        const updatedContract = await Contract.findByIdAndUpdate(contract._id, {
            status: contractStatus.FINISHED
        }, { returnDocument: "after" }).populate("freelancer").populate("project")
        if (!updatedContract) return error(res, 400, "cant update the contract")

        // contract.status = contractStatus.FINISHED
        // const updatedContract = await contract.save()

        success(res, 200, { contract: updatedContract, project: updatedProject })
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