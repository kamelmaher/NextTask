import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { fetchAdminProjects, changeProjectApprovalStatus } from "../../features/projects/projects.reducers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { projectApprovalStatus } from "../../utils/status";
import { NavLink } from "react-router-dom";

export default function DashboardProjectsPage() {
    const dispatch = useAppDispatch();
    const { projects, loading, updateLoading, err, updateErr } = useAppSelector((state) => state.projects);
    const [status, setStatus] = useState("");
    const [approveStatus, setApproveStatus] = useState("");

    useEffect(() => {
        dispatch(fetchAdminProjects({ status, approveStatus }));
    }, [dispatch, status, approveStatus]);

    const handleApproval = (id: string, nextStatus: string) => {
        dispatch(changeProjectApprovalStatus({ id, status: nextStatus }))
    };

    return (
        <div className="bg-background">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-text-dark">Project Dashboard</h1>
                        <p className="text-text-dim">List projects and update approval status.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <select
                            className="rounded-lg border border-border bg-background px-4 py-2 text-sm"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All statuses</option>
                            <option value="open">Open</option>
                            <option value="inProgress">In progress</option>
                            <option value="finished">Finished</option>
                            <option value="declined">Declined</option>
                        </select>
                        <select
                            className="rounded-lg border border-border bg-background px-4 py-2 text-sm"
                            value={approveStatus}
                            onChange={(e) => setApproveStatus(e.target.value)}
                        >
                            <option value="">All approval states</option>
                            <option value="accepted">Accepted</option>
                            <option value="declined">Declined</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <Spinner label="Loading projects..." />
                ) : err ? (
                    <p className="text-red-500">{err}</p>
                ) : projects.length === 0 ? (
                    <p className="text-text-dim">No projects found.</p>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                        <table className="w-full border-collapse text-sm">
                            <thead className="bg-background text-left text-text-dim">
                                <tr>
                                    <th className="px-6 py-4">Project</th>
                                    <th className="px-6 py-4">Employer</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Approval</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project._id} className="border-t border-border hover:bg-slate-50">
                                        <td className="px-6 py-4 font-semibold text-text-dark">
                                            <NavLink to={`/project/${project._id}`}>
                                                {project.title}
                                            </NavLink>
                                        </td>
                                        <td className="px-6 py-4">{project.employer?.firstName} {project.employer?.lastName}</td>
                                        <td className="px-6 py-4">{project.status}</td>
                                        <td className="px-6 py-4">{project.approveStatus}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                {
                                                    updateLoading ? <Spinner size="sm" />
                                                        :
                                                        <>
                                                            {project.approveStatus !== projectApprovalStatus.ACCEPTED &&
                                                                <button
                                                                    className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white hover:bg-green-600"
                                                                    onClick={() => handleApproval(project._id, projectApprovalStatus.ACCEPTED)}
                                                                    disabled={updateLoading}
                                                                >

                                                                    Accept
                                                                </button>
                                                            }
                                                            {project.approveStatus !== projectApprovalStatus.DECLINED && (
                                                                <button
                                                                    className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white hover:bg-red-600"
                                                                    onClick={() => handleApproval(project._id, projectApprovalStatus.DECLINED)}
                                                                    disabled={updateLoading}
                                                                >
                                                                    Decline
                                                                </button>
                                                            )}
                                                        </>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {updateErr && <p className="mt-4 text-sm text-red-500">{updateErr}</p>}
            </div>
        </div>
    );
}
