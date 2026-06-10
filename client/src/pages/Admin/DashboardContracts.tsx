import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { getContracts } from "../../features/contract/contract.reducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { contractStatus } from "../../utils/status";

export default function DashboardContractsPage() {
    const dispatch = useAppDispatch();
    const { contracts, loading, err } = useAppSelector((state) => state.contract);
    const [status, setStatus] = useState("");

    useEffect(() => {
        dispatch(getContracts({ status }));
    }, [dispatch, status]);

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-text-dark">Contract Listing</h1>
                        <p className="text-text-dim">Browse contracts and review current project progress.</p>
                    </div>
                    <select
                        className="rounded-lg border border-border bg-background px-4 py-2 text-sm"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All statuses</option>
                        <option value={contractStatus.INPROGRESS}>In progress</option>
                        <option value={contractStatus.SUBMITTED}>Submitted</option>
                        <option value={contractStatus.FINISHED}>Finished</option>
                        <option value={contractStatus.DECLINED}>Declined</option>
                    </select>
                </div>

                {loading ? (
                    <Spinner label="Loading contracts..." />
                ) : err ? (
                    <p className="text-red-500">{err}</p>
                ) : contracts.length === 0 ? (
                    <p className="text-text-dim">No contracts found.</p>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                        <table className="w-full border-collapse text-sm">
                            <thead className="bg-background text-left text-text-dim">
                                <tr>
                                    <th className="px-6 py-4">Project</th>
                                    <th className="px-6 py-4">Freelancer</th>
                                    <th className="px-6 py-4">Employer</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contracts.map((contract) => (
                                    <tr key={contract._id} className="border-t border-border hover:bg-slate-50">
                                        <td className="px-6 py-4 font-semibold text-text-dark">{contract.project?.title}</td>
                                        <td className="px-6 py-4">{contract.freelancer?.firstName} {contract.freelancer?.lastName}</td>
                                        <td className="px-6 py-4">{contract.employer?.firstName} {contract.employer?.lastName}</td>
                                        <td className="px-6 py-4">${contract.agreedPrice.toLocaleString()}</td>
                                        <td className="px-6 py-4">{contract.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
