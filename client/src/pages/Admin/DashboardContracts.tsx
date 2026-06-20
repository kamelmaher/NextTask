import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { getAllContracts } from "../../features/contract/contract.reducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { contractStatus } from "../../utils/status";
import { NavLink } from "react-router-dom";
import { DashHeader, DataTable, StatGrid } from "../../components/DashboardUi";

export default function DashboardContractsPage() {
    const dispatch = useAppDispatch();
    const { contracts, loading, err } = useAppSelector((state) => state.contract);
    const { dashboardStatics, loading: staticsLoading } = useAppSelector(state => state.statics)
    const [status, setStatus] = useState("");

    useEffect(() => {
        dispatch(getAllContracts({ status }));
    }, [dispatch, status]);
    console.log(contracts)
    return (
        <div>
            <DashHeader title="Contracts" subtitle="Active and completed contracts between clients and freelancers." />
            {
                staticsLoading ? <Spinner /> :
                    dashboardStatics &&
                    <StatGrid stats={[
                        { label: "Active", value: `${dashboardStatics.contractStatics.inProgress}` },
                        { label: "Completed", value: `${dashboardStatics.contractStatics.completed}` },
                        { label: "cancelled", value: `${dashboardStatics.contractStatics.declined}` },
                        { label: "Total value", value: `$${dashboardStatics.contractStatics.totalValue}` },
                    ]} />
            }

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
