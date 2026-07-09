import { NavLink } from "react-router-dom";
import type { Project } from "../hooks/useProjects";
import { projectApprovalStatus } from "../utils/status";
import { Clock, DollarSign, ArrowUpRight, User } from "lucide-react";

type ProjectCardProps = {
    project: Project,
    link?: string,
}

export function ProjectCard({ project, link }: ProjectCardProps) {
    if (!project) return null;

    const url = link || `/project/${project._id}`;
    const status = project.approveStatus === projectApprovalStatus.ACCEPTED ? project.status : project.approveStatus;

    // Status color mapping
    const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
        open: { bg: "bg-[#DBEAFE]", text: "text-[#3B82F6]", dot: "bg-[#3B82F6]" },
        inProgress: { bg: "bg-[#FEF3C7]", text: "text-[#F59E0B]", dot: "bg-[#F59E0B]" },
        finished: { bg: "bg-[#D1FAE5]", text: "text-[#10B981]", dot: "bg-[#10B981]" },
        declined: { bg: "bg-[#FEE2E2]", text: "text-[#EF4444]", dot: "bg-[#EF4444]" },
        pending: { bg: "bg-[#F3E8FF]", text: "text-[#7C3AED]", dot: "bg-[#7C3AED]" },
        accepted: { bg: "bg-[#D1FAE5]", text: "text-[#10B981]", dot: "bg-[#10B981]" },
    };

    const statusStyle = statusColors[status?.toLowerCase()] || statusColors.pending;

    return (
        <div className="group relative rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:border-[#A78BFA] hover:shadow-[0_0_0_1px_rgba(124,58,237,0.1),0_4px_20px_rgba(124,58,237,0.08)] hover:-translate-y-0.5">
            <NavLink to={url} className="block">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 shrink-0 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-sm font-bold text-[#7C3AED]">
                            {project?.category?.title?.charAt(0) || 'P'}
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-semibold text-[#0F172A] group-hover:text-[#7C3AED] transition-colors line-clamp-1">
                                {project.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-[#64748B]">
                                <Clock className="h-3 w-3" />
                                <span>{new Date(project.createdAt).toLocaleDateString('en-GB')}</span>
                                <span>•</span>
                                <span>{project?.category?.title}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}">
                        <div className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot} status-pulse`} />
                        {status}
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 mb-4">
                    {project.desc}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-[#0F172A]">
                            <DollarSign className="h-4 w-4 text-[#7C3AED]" />
                            {project.minPrice} - {project.maxPrice}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                            <Clock className="h-3.5 w-3.5" />
                            {project.deliveryDuration} days
                        </div>
                        {project.contract && (
                            <span className="rounded-full bg-[#F3E8FF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#7C3AED]">
                                Contract
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1 text-sm font-medium text-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity">
                        View
                        <ArrowUpRight className="h-4 w-4" />
                    </div>
                </div>

                {/* Employer Info */}
                <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-[#F8FAFC] flex items-center justify-center">
                        <User className="h-3 w-3 text-[#94A3B8]" />
                    </div>
                    <span className="text-xs text-[#64748B]">
                        Posted by <span className="font-medium text-[#334155]">{project.employer?.firstName} {project?.employer?.lastName}</span>
                    </span>
                </div>
            </NavLink>

        </div>
    );
}