const projectStatus = {
    OPEN: "open",
    INPROGRESS: "inProgress",
    FINISHED: "finished",
    DECLINED: "declined"
}
const projectApprovalStatus = {
    ACCEPTED: "accepted",
    DECLINED: "declined",
    PENDING: "pending"
}

const proposalStatus = {
    ACCEPTED: "accepted",
    PENDING: "pending",
    DECLINED: "declined"
}

const contractStatus = {
    INPROGRESS: "inprogress",
    DECLINED: "declined",
    SUBMITED: "submited",
    ACCEPTED: "accepted"
}

module.exports = {
    projectStatus,
    projectApprovalStatus,
    proposalStatus,
    contractStatus
}