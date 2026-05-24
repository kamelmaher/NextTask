import type { Project } from "../types/project";

type ProjectCard = {
    project: Project
}
const ProjectCard = ({ project }: ProjectCard) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">{project.category}</span>
            <h3 className="mt-3 text-lg font-semibold text-gray-900 truncate">{project.title}</h3>
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">{project.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-medium text-gray-700">
                <span>${project.minPrice} - ${project.maxPrice}</span>
                <span className="text-gray-400">{project.deliveryDuration} Days</span>
            </div>
        </div>
    );
}

export default ProjectCard
