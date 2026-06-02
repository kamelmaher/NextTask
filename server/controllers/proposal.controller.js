const Project = require("../models/project.model")
const Proposal = require("../models/proposal.model")
const Contract = require("../models/contract.model")
const { error, serverError, success } = require("../utils/responses")
const { projectApprovalStatus, projectStatus, proposalStatus } = require("../utils/status")

exports.getProposals = async (req, res) => {
    const projectId = req.params.id
    if (!projectId) return error(res, 400, "project not found")
    try {
        const proposals = await Proposal.find({ project: projectId }).populate("freelancer", "firstName lastName title")
        success(res, 200, { proposals })
    } catch (err) {
        console.log(err)
        return serverError(res)
    }
}

exports.createProposal = async (req, res) => {
    const freelancer = req.user
    if (!freelancer) return error(res, 403, "cant create propsal")
    const { content, price, deliveryDuration, projectId } = req.body
    if (!projectId) return error(res, 400, "project not found")

    try {
        // check project exists
        const project = await Project.findById(projectId)
        if (!project) return error(res, 404, "project not found")

        // check existing propsal
        const foundProposal = await Proposal.findOne({ project: projectId, freelancer: freelancer._id })
        if (foundProposal) return error(res, 400, "you have already made a proposal")

        // prevent the employer who publishing the project from creating proposals
        if (project.employer._id.toString() === freelancer._id.toString())
            return error(res, 400, "cant apply for your project")

        // accept proposals for the open and accepted projects only 
        if (!IsValidProject(project)) {
            return error(res, 400, "cant apply for this project")
        }

        const proposal = await Proposal.create({ ...req.body, project: projectId, freelancer: freelancer._id })
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

        const project = await Project.findById(proposal.project)
        if (!project) return error(res, 404, "project not found")

        // check project is accepted and open
        if (!IsValidProject(project)) {
            return error(res, 400, "project is not open")
        }

        // check employer is the owner of the project 
        if (project.employer.toString() !== employer._id.toString())
            return error(res, 401, "cant accept proposals for this project")



        // accept proposal
        await Proposal.findByIdAndUpdate(proposalId, {
            status: proposalStatus.ACCEPTED
        })

        // reject all other proposals
        await Proposal.updateMany(
            {
                project: proposal.project,
                _id: { $ne: proposalId },
                status: proposalStatus.PENDING
            },
            {
                status: proposalStatus.DECLINED
            }
        )


        // create a new contract 
        const contract = new Contract({
            project: proposal.project,
            proposal: proposal._id,
            employer: project.employer,
            freelancer: proposal.freelancer,
            agreedPrice: proposal.price,
            deadline: proposal.deliveryDuration
        })

        // update Project Status - add the contract to the project
        project.status = projectStatus.INPROGRESS
        project.contract = contract._id

        await project.save()
        await contract.save()
        // await Contract.create({
        //     projectId: proposal.projectId,
        //     proposalId: proposal._id,
        //     employerId: project.employerId,
        //     freelancerId: proposal.freelancerId,
        //     agreedPrice: proposal.price,
        //     deadline: proposal.deliveryDuration
        // })

        success(res, 200, { proposal, project, contract })
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