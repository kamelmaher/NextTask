import { Search } from "lucide-react";
import { useLoadCategories } from "../../hooks/useCategories";
import Spinner from "../Spinner";
import type { projectFilters } from "../../hooks/useProjects";

type props = {
    filters: projectFilters
    setFilters: (e: projectFilters) => void,
    approveStatus: string,
    setApproveStatus: (e: string) => void
}

const ProjectsFilters = ({ filters, setFilters, approveStatus, setApproveStatus }: props) => {
    const { data, isPending } = useLoadCategories()
    const categories = data?.categories || []
    return (
        <div className="mb-6 rounded-xl border border-border p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-3 outline-none focus:border-primary"
                    />
                </div>

                {/* Project Status */}
                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
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
                {
                    isPending ? <Spinner /> :
                        <select
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
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
                }

                <button
                    onClick={() => {
                        setApproveStatus("");
                        setFilters({ status: "", category: "", search: "" })
                    }}
                    className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted bg-surface"
                >
                    Clear Filters
                </button>
            </div>
        </div >

    )
}

export default ProjectsFilters
