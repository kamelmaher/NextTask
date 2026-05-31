import { myProposals } from "../data/mockData";

const statusStyles: Record<string, string> = {
    "Under Review": "bg-blue-50 text-blue-600",
    Interviewing: "bg-orange-50 text-orange-600",
    Accepted: "bg-emerald-50 text-emerald-600",
    Declined: "bg-rose-50 text-rose-600",
};

export default function ProposalsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-text-dark">
                    My proposals
                </h1>
                <p className="text-sm text-text-dim">
                    {myProposals.length} proposals submitted
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
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
                        {myProposals.map((p) => (
                            <tr key={p.id} className="text-sm">
                                <td className="px-6 py-4 font-medium text-text-dark">{p.projectTitle}</td>
                                <td className="px-6 py-4">${p.bid.toLocaleString()}</td>
                                <td className="px-6 py-4 text-text-dim">{p.submittedAt}</td>
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
        </div>
    );
}
