import { NavLink } from "react-router-dom";
import type { Project } from "../features/projects/projects.types";
import { projectApprovalStatus } from "../utils/status";
type ProjectCardProps = {
    project: Project,
    link?: string
}
export function ProjectCard({ project, link }: ProjectCardProps) {
    if (!project) return null;
    const url = link || `/project/${project._id}`
    const status = project.approveStatus === projectApprovalStatus.ACCEPTED ? project.status : project.approveStatus
    return (
        <NavLink
            to={url}
            className="group relative block rounded-2xl border border-border bg-surface p-6 transition-all hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5"
        >
            <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 rounded-lg bg-brand-soft flex items-center justify-center text-sm font-bold text-brand-foreground">{project.category?.title?.charAt(0) || 'P'}</div>
                    <div>
                        <h3 className="font-display font-bold text-text-dark group-hover:text-brand">
                            {project.title}
                        </h3>
                        <p className="text-xs text-text-dim">
                            Posted {new Date(project.createdAt).toLocaleDateString('en-GB')} • {project.category?.title}
                        </p>
                        <p className="text-xs text-text-dim mt-1">Posted by <span className="font-medium text-text-dark">{project.employer?.firstName} {project.employer?.lastName}</span> • @{project.employer?.userName}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold">
                        ${project.minPrice.toLocaleString()} - ${project.maxPrice.toLocaleString()}
                    </p>
                    <p className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold text-yellow-500`}>
                        {status}
                    </p>
                    <p className="text-xs text-text-dim mt-2">Delivery: {project.deliveryDuration} days</p>
                </div>
            </div>
            <p
                className="mb-6 text-sm leading-relaxed text-text-dim line-clamp-3"
            >
                {project.desc}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                    <span className="rounded-lg bg-background px-3 py-1 text-xs font-medium text-text-dim">{project.category?.title}</span>
                    <span className="rounded-lg bg-background px-3 py-1 text-xs font-medium text-text-dim">{project.deliveryDuration} days</span>
                    {project.contract && <span className="rounded-lg bg-background px-3 py-1 text-xs font-medium text-text-dim">Contract</span>}
                </div>
                <span className="text-sm font-bold text-brand">View Details →</span>
            </div>
        </NavLink>
    );
}
