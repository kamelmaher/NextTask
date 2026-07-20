import { api } from "../lib/axios"

export const generateProposal = async (project: { title: string, desc: string }) => {
    const response = await api.post(`/proposal/generate`, project)
    return response.data.proposal
}