import { NavLink } from "react-router-dom";
import type { Project } from "../features/projects/projects.types";

export function ProjectCard({ project }: { project: Project }) {
    return (
        <NavLink
            to={`/project/${project._id}`}
            className="group relative block rounded-2xl border border-border bg-surface p-6 transition-all hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5"
        >
            <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="size-10 shrink-0 rounded-lg bg-brand-soft" />
                    <div>
                        <h3 className="font-display font-bold text-text-dark group-hover:text-brand">
                            {project.title}
                        </h3>
                        <p className="text-xs text-text-dim">
                            Posted 20/5/2026 • test category
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold">
                        ${project.minPrice.toLocaleString()} - ${project.maxPrice.toLocaleString()}
                    </p>
                    {/* <p className="text-[10px] font-bold uppercase tracking-wider text-text-dim">
                        {project.pricingType}
                    </p> */}
                </div>
            </div>
            <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-text-dim">
                {project.desc}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
                {/* <div className="flex flex-wrap gap-2">
                    {project..map((t) => (
                        <span
                            key={t}
                            className="rounded-lg bg-background px-3 py-1 text-xs font-medium text-text-dim"
                        >
                            {t}
                        </span>
                    ))}
                </div> */}
                <span className="text-sm font-bold text-brand">View Details →</span>
            </div>
        </NavLink>
    );
}
