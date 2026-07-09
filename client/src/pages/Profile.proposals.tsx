import { useState } from "react";
import Spinner from "../components/Spinner";
import { NavLink } from "react-router-dom";
import { useLoadProposalsByFreelancer } from "../hooks/useProposal";

const statusStyles: Record<string, string> = {
    pending: "bg-blue-50 text-blue-600",
    accepted: "bg-emerald-50 text-emerald-600",
    declined: "bg-rose-50 text-rose-600",
};

const statusOptions = [
    { value: "all", label: "All statuses" },
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "declined", label: "Declined" },
];

export default function ProposalsPage() {
    const [statusFilter, setStatusFilter] = useState("all")
    const activeStatus = statusFilter === "all" ? "" : statusFilter
    const { data, isPending, error } = useLoadProposalsByFreelancer(activeStatus)
    const proposals = data?.proposals || []

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-2xl font-bold tracking-tight text-text-dark">
                        My proposals
                    </h1>
                    <p className="text-sm text-text-dim">
                        {proposals.length} proposals submitted
                    </p>
                </div>

                <label className="flex items-center gap-2 text-sm text-text-dim">
                    <span>Status</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-dark focus:border-primary focus:outline-none"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {
                isPending ? <Spinner size="lg" /> :
                    error ? <p className="text-sm text-red-500">{error.message}</p> :
                        proposals.length > 0 ?
                            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                                <div>
                                </div>
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-background text-[10px] font-bold uppercase tracking-wider text-text-dim">
                                            <th className="px-6 py-3">Project</th>
                                            <th className="px-6 py-3">Bid</th>
                                            <th className="px-6 py-3">Submitted</th>
                                            <th className="px-6 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {proposals.map((p) => (
                                            <tr key={p._id} className="text-sm">
                                                <td className="px-6 py-4 font-medium text-text-dark">
                                                    <NavLink to={`/project/${p.project._id}`}>
                                                        {p.project.title}
                                                    </NavLink>
                                                </td>
                                                <td className="px-6 py-4">${p.price.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-text-dim">{new Date(p.createdAt).toLocaleDateString("en-GB")}</td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${statusStyles[p.status]}`}
                                                    >
                                                        {p.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            : <p className="text-sm text-gray-500">You dont have any proposals</p>
            }
        </div>
    );
}
