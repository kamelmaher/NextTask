import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Spinner from "../../components/Spinner";
import { fetchAdminProjects, changeProjectApprovalStatus } from "../../features/projects/projects.reducers";
import { projectApprovalStatus } from "../../utils/status";
import { NavLink } from "react-router-dom";
import { DashHeader, StatGrid, DataTable } from "../../components/DashboardUi";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { Search } from "lucide-react";

export default function DashboardProjectsPage() {
    const dispatch = useAppDispatch();
    const { projects, loading, updateLoading, err, } = useAppSelector((state) => state.projects);
    const { categories } = useAppSelector(state => state.category)
    const { dashboardStatics, loading: staticsLoading } = useAppSelector(state => state.statics)
    const [searchTerm, setSearchTerm] = useState("");
    const [searchParams] = useSearchParams();
    const [approveStatus, setApproveStatus] = useState(() => searchParams.get("approve-status") || "");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 3000)

    useEffect(() => {
        dispatch(fetchAdminProjects({ title: debouncedSearch, status, approveStatus, category }));
    }, [dispatch, status, approveStatus, debouncedSearch, category]);

    const handleApproval = (id: string, status: string) => {
        const nextStatus = status == "accept" ? "accepted" : "declined"
        dispatch(changeProjectApprovalStatus({ id, status: nextStatus }));
    };

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
            <div className="mb-6 rounded-xl border border-border p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-3 outline-none focus:border-primary"
                        />
                    </div>

                    {/* Project Status */}
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                    >
                        <option value="">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="inProgress">In Progress</option>
                        <option value="finished">Finished</option>
                    </select>

                    {/* Approval Status */}
                    <select
                        value={approveStatus}
                        onChange={(e) => setApproveStatus(e.target.value)}
                        className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                    >
                        <option value="">All Approvals</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="declined">Declined</option>
                    </select>

                    {/* Category */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                    >
                        <option value="">All Categories</option>

                        {categories.map((category) => (
                            <option
                                key={category._id}
                                value={category._id}
                            >
                                {category.title}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setStatus("");
                            setApproveStatus("");
                            setCategory("");
                        }}
                        className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted bg-surface"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
            {
                loading ? <Spinner size="lg" /> :
                    err ? <p className="text-red-500 text-sm">{err}</p> :
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
                                                            updateLoading ? <Spinner size="md" /> :
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
        </div >
    );
}