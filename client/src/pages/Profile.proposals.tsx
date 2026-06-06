import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getProposals } from "../features/proposal/proposal.reducer";
import { NavLink } from "react-router-dom";

const statusStyles: Record<string, string> = {
    pending: "bg-blue-50 text-blue-600",
    accepted: "bg-emerald-50 text-emerald-600",
    declined: "bg-rose-50 text-rose-600",
};

export default function ProposalsPage() {
    const user = useAppSelector(state => state.auth.user)
    const { proposals, loading, err } = useAppSelector(state => state.proposal)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!user) return
        dispatch(getProposals({ userId: user._id }))
    }, [dispatch, user])
    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-text-dark">
                    My proposals
                </h1>
                <p className="text-sm text-text-dim">
                    {proposals.length} proposals submitted
                </p>
            </div>
            {
                loading ? <Spinner size="lg" /> :
                    err ? <p className="text-sm text-red-500">{err}</p> :
                        proposals.length > 0 ?
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
