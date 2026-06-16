import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Spinner from "../../components/Spinner";
import { fetchAdminProjects, changeProjectApprovalStatus } from "../../features/projects/projects.reducers";
import { projectApprovalStatus } from "../../utils/status";
import { Link, NavLink } from "react-router-dom";
import { Briefcase, Search, CheckCircle, XCircle, Clock, Filter, Eye, Badge } from "lucide-react";
import { DashHeader, StatGrid, DataTable } from "../../components/DashboardUi";

const statusConfig = {
    open: { bg: "bg-[#DBEAFE]", text: "text-[#3B82F6]", label: "Open" },
    inProgress: { bg: "bg-[#FEF3C7]", text: "text-[#F59E0B]", label: "In Progress" },
    finished: { bg: "bg-[#D1FAE5]", text: "text-[#10B981]", label: "Finished" },
    declined: { bg: "bg-[#FEE2E2]", text: "text-[#EF4444]", label: "Declined" },
    pending: { bg: "bg-[#F3E8FF]", text: "text-[#7C3AED]", label: "Pending" },
    accepted: { bg: "bg-[#D1FAE5]", text: "text-[#10B981]", label: "Accepted" },
};

export default function DashboardProjectsPage() {
    const dispatch = useAppDispatch();
    const { projects, loading, updateLoading, err, updateErr } = useAppSelector((state) => state.projects);
    const [status, setStatus] = useState("");
    const [approveStatus, setApproveStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchAdminProjects({ status, approveStatus }));
    }, [dispatch, status, approveStatus]);

    const handleApproval = (id: string, nextStatus: string) => {
        dispatch(changeProjectApprovalStatus({ id, status: nextStatus }));
    };

    // const filteredProjects = projects.filter(p =>
    //     searchTerm === "" || p.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    console.log(projects)
    return (
        <div>
            <DashHeader title="Projects" subtitle="All projects posted on the platform." />
            <StatGrid stats={[
                { label: "Active projects", value: "2,431", delta: "+184 this week" },
                { label: "Completed", value: "18,402" },
                { label: "Avg budget", value: "$1,840" },
                { label: "Total value", value: "$4.6M", delta: "+12% MoM" },
            ]} />
            {
                loading ? <Spinner size="lg" /> :
                    <DataTable headers={["Title", "Category", "Budget", "Proposals", "Status", ""]}>
                        {
                            projects.map((p) => (
                                <tr key={p._id} className="hover:bg-muted/30">
                                    <td className="px-5 py-4">
                                        <p className="line-clamp-1 max-w-md font-medium text-text-dark">{p.title}</p>
                                        <p className="text-xs text-text-muted">by {p.employer.firstName} · {new Date(p.createdAt).toLocaleDateString("en-GB")}</p>
                                    </td>
                                    <td className="px-5 py-4 text-text-body">{p.category?.title}</td>
                                    <td className="px-5 py-4 font-mono font-semibold text-text-dark">${p.minPrice} - ${p.maxPrice}</td>
                                    <td className="px-5 py-4 text-text-body">10</td>
                                    <td className="px-5 py-4">{p.status}</td>
                                    <td className="px-5 py-4 text-right">
                                        <NavLink to={`/project/${p._id}`} className="text-sm font-medium text-primary hover:text-primary-dark">View</NavLink>
                                    </td>
                                </tr>
                            ))}
                    </DataTable>
            }
        </div >
    );
}