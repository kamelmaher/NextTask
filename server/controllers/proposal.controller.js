const Project = require("../models/project.model")
const Proposal = require("../models/proposal.model")
const Contract = require("../models/contract.model")
const { error, serverError, success } = require("../utils/responses")
const { projectApprovalStatus, projectStatus, proposalStatus } = require("../utils/status")

exports.getProposals = async (req, res) => {
    const projectId = req.params.id
    if (!projectId) return error(res, 400, "project not found")
    try {
        const proposals = await Proposal.find({ projectId }).populate("freelancerId", "firstName lastName")
        success(res, 200, { proposals })
    } catch (err) {
        console.log(err)
        return serverError(res)
    }
}

exports.createProposal = async (req, res) => {
    const projectId = req.params.id
    const freelancer = req.user
    if (!freelancer) return error(res, 403, "cant create propsal")
    const { content, price, deliveryDuration, files } = req.body
    if (!projectId) return error(res, 400, "project not found")

    try {
        // check existing propsal
        const foundProposal = await Proposal.findOne({ projectId, freelancerId: freelancer._id })
        if (foundProposal) return error(res, 400, "you have already made a proposal")

        const project = await Project.findById(projectId)
        if (!project) return error(res, 404, "project not found")

        // prevent the employer who publishing the project from creating proposals
        if (project.employerId.toString() === freelancer._id.toString())
            return error(res, 400, "cant apply for your project")

        // accept proposals for the open and accepted projects only 
        if (!IsValidProject(project)) {
            return error(res, 400, "cant apply for this project")
        }

        const proposal = await Proposal.create({ ...req.body, projectId, freelancerId: freelancer._id })
        return success(res, 201, { proposal })
    } catch (err) {
        console.log(err)
        return serverError(res)
    }
}

exports.acceptProposal = async (req, res) => {
    const employer = req.user
    if (!employer) return error(res, 401, "unauthorized")
    const proposalId = req.params.id
    try {
        const proposal = await Proposal.findById(proposalId)
        if (!proposal) return error(res, 404, "proposal not found")

        const project = await Project.findById(proposal.projectId)
        if (!project) return error(res, 404, "project not found")

        // check project is accepted and open
        if (!IsValidProject(project)) {
            return error(res, 400, "project is not open")
        }

        // check employer is the owner of the project 
        if (project.employerId.toString() !== employer._id.toString())
            return error(res, 401, "cant accept proposals for this project")



        // accept proposal
        await Proposal.findByIdAndUpdate(proposalId, {
            status: proposalStatus.ACCEPTED
        })

        // reject all other proposals
        await Proposal.updateMany(
            {
                projectId: proposal.projectId,
                _id: { $ne: proposalId },
                status: proposalStatus.PENDING
            },
            {
                status: proposalStatus.DECLINED
            }
        )

        // update Project Status
        await Project.findByIdAndUpdate(proposal.projectId, { status: projectStatus.INPROGRESS })

        // create a new contract 
        await Contract.create({
            projectId: proposal.projectId,
            proposalId: proposal._id,
            employerId: project.employerId,
            freelancerId: proposal.freelancerId,
            agreedPrice: proposal.price,
            deadline: proposal.deliveryDuration
        })

        success(res, 200)
    } catch (err) {
        console.log(err)
        serverError(res)
    }
}

const IsValidProject = (project) => {
    if (!project) return false
    const isProjectAccepted =
        project.approveStatus === projectApprovalStatus.ACCEPTED

    const isProjectOpen =
        project.status === projectStatus.OPEN

    return isProjectAccepted && isProjectOpen
}