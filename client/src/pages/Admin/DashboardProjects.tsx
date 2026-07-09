import { useState } from "react";
import Spinner from "../../components/Spinner";
import { projectApprovalStatus } from "../../utils/status";
import { NavLink } from "react-router-dom";
import { DashHeader, StatGrid, DataTable } from "../../components/DashboardUi";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { useChangeApproveStatus, useLoadAdminProjects } from "../../hooks/useProjects";
import ProjectsFilters from "../../components/Dashboard/ProjectsFilters";
import type { projectFilters } from "../../hooks/useProjects";
import { useLoadDashboardStatics } from "../../hooks/useStatics";

export default function DashboardProjectsPage() {
    const { data: dashboardStatics, isPending: staticsLoading } = useLoadDashboardStatics()

    // filters
    const [searchParams] = useSearchParams();
    const [approveStatus, setApproveStatus] = useState(() => searchParams.get("approve-status") || "")
    const [filters, setFilters] = useState({
        status: "",
        category: "",
        search: ""
    })
    const debouncedSearch = useDebounce(filters.search, 1500)

    // projects fetching
    const { data: projectsData, isPending: loading, error } = useLoadAdminProjects({
        ...filters,
        approveStatus,
        search: debouncedSearch
    })
    const projects = projectsData?.projects || []

    // project mutate
    const { mutateAsync: changeApproveStatus, isPending } = useChangeApproveStatus()
    const handleApproval = async (id: string, status: string) => {
        const nextStatus = status == "accept" ? "accepted" : "declined"
        await changeApproveStatus({ id, status: nextStatus })
    };

    const handleChangeFilters = (e: projectFilters) => setFilters(prev => ({ ...prev, ...e }))
    return (
        <div>
            <DashHeader title="Projects" subtitle="All projects posted on the platform." />
            {
                staticsLoading ? <Spinner size="md" /> :
                    dashboardStatics &&
                    <StatGrid stats={[
                        { label: "Total projects", value: `${dashboardStatics.projectStatics.totalProjects}` },
                        { label: "Active projects", value: `${dashboardStatics.projectStatics.activeProjects}` },
                        { label: "Completed", value: `${dashboardStatics.projectStatics.completedProjects}` },
                        { label: "Pending projects", value: `${dashboardStatics.projectStatics.pendingProjects}` },
                    ]} />
            }

            <ProjectsFilters filters={filters} setFilters={handleChangeFilters} setApproveStatus={setApproveStatus} approveStatus={approveStatus} />

            {
                loading ? <Spinner size="lg" /> :
                    error ? <p className="text-red-500 text-sm">{error.message}</p> :
                        <DataTable headers={["Title", "Category", "Budget", "Proposals", "Status", "approval Status", "Actions"]}>
                            {
                                projects.map((p) => (
                                    <tr key={p._id} className="hover:bg-muted/30">
                                        <td className="px-5 py-4">
                                            <NavLink to={`/project/${p._id}`} className="line-clamp-1 max-w-md font-medium text-text-dark">
                                                {p.title}
                                            </NavLink>
                                            <p className="text-xs text-text-muted">by {p.employer.firstName} · {new Date(p.createdAt).toLocaleDateString("en-GB")}</p>
                                        </td>
                                        <td className="px-5 py-4 text-text-body">{p.category?.title}</td>
                                        <td className="px-5 py-4 font-mono font-semibold text-text-dark">${p.minPrice} - ${p.maxPrice}</td>
                                        <td className="px-5 py-4 text-text-body">10</td>
                                        <td className="px-5 py-4">{p.status}</td>
                                        <td className="px-5 py-4">{p.approveStatus}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex gap-2">
                                                {
                                                    <button
                                                        className="bg-green-500 p-2 rounded text-white"
                                                        onClick={(e) => handleApproval(p._id, e.currentTarget.textContent.toLowerCase())}
                                                    >
                                                        {
                                                            isPending ? <Spinner size="md" /> :
                                                                (p.approveStatus === projectApprovalStatus.PENDING || p.approveStatus === projectApprovalStatus.DECLINED) ? "Accept" : "Decline"
                                                        }
                                                    </button>
                                                }
                                                <button className="bg-red-500 p-2 rounded text-white">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </DataTable>
            }
        </div>
    );
}