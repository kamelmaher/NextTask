import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { getAllContracts } from "../../features/contract/contract.reducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { NavLink } from "react-router-dom";
import { DashHeader, DataTable, StatGrid } from "../../components/DashboardUi";

export default function DashboardContractsPage() {
    const dispatch = useAppDispatch();
    const { contracts, loading } = useAppSelector((state) => state.contract);
    const { dashboardStatics, loading: staticsLoading } = useAppSelector(state => state.statics)
    const [status, setStatus] = useState("");
    const [approveStatus, setApproveStatus] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        const filters: Record<string, string | number> = { status };
        if (approveStatus) filters.approveStatus = approveStatus;
        if (minPrice) filters.minPrice = Number(minPrice);
        if (maxPrice) filters.maxPrice = Number(maxPrice);
        dispatch(getAllContracts(filters));
    }, [dispatch, status, approveStatus, minPrice, maxPrice]);

    return (
        <div>
            <DashHeader title="Contracts" subtitle="Active and completed contracts between clients and freelancers." />
            {
                staticsLoading ? <Spinner /> :
                    dashboardStatics &&
                    <StatGrid stats={[
                        { label: "Total", value: `${dashboardStatics.contractStatics.totalContracts}` },
                        { label: "Active", value: `${dashboardStatics.contractStatics.inProgress}` },
                        { label: "Completed", value: `${dashboardStatics.contractStatics.completed}` },
                        { label: "cancelled", value: `${dashboardStatics.contractStatics.declined}` },
                        { label: "Total value", value: `$${dashboardStatics.contractStatics.totalValue}` },
                    ]} />
            }

            <div className="mb-6 rounded-xl border border-border p-4">
                <div className="grid gap-4 md:grid-cols-4">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                    >
                        <option value="">All Contract Status</option>
                        <option value="inprogress">In Progress</option>
                        <option value="submitted">Submitted</option>
                        <option value="accepted">Accepted</option>
                        <option value="declined">Declined</option>
                    </select>

                    <select
                        value={approveStatus}
                        onChange={(e) => setApproveStatus(e.target.value)}
                        className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                    >
                        <option value="">All Approval Status</option>
                        <option value="accepted">Accepted</option>
                        <option value="declined">Declined</option>
                        <option value="pending">Pending</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Min price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                    />

                    <input
                        type="number"
                        placeholder="Max price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                    />
                </div>

                <button
                    onClick={() => {
                        setStatus("");
                        setApproveStatus("");
                        setMinPrice("");
                        setMaxPrice("");
                    }}
                    className="mt-4 rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted bg-surface"
                >
                    Clear Filters
                </button>
            </div>

            {
                loading ? <Spinner size="lg" /> :
                    <DataTable headers={["Project", "Client", "Freelancer", "Amount", "Status", "Started"]}>
                        {contracts.map((c) => (
                            <tr key={c._id} className="hover:bg-muted/30">
                                <td className="px-5 py-4 font-medium text-text-dark">
                                    <NavLink to={`/project/${c.project._id}`}>{c.project.title}</NavLink>
                                </td>
                                <td className="px-5 py-4 text-text-body">{c.employer.firstName} {c.employer.lastName}</td>
                                <td className="px-5 py-4 text-text-body">{c.freelancer.firstName} {c.freelancer.lastName}</td>
                                <td className="px-5 py-4 font-mono font-semibold text-text-dark">${c.agreedPrice}</td>
                                <td className="px-5 py-4">{c.status}</td>
                                <td className="px-5 py-4 text-text-muted">{new Date(c.createdAt).toLocaleDateString("en-GB")}</td>
                            </tr>
                        ))}
                    </DataTable>
            }
        </div >
    );
}
