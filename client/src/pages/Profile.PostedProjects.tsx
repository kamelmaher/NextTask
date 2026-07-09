import { ProjectCard } from "../components/ProjectCard"
import Spinner from "../components/Spinner"
import { useAppSelector } from "../store/store"
import { projectStatus } from "../utils/status"
import { useLoadProjects } from "../hooks/useProjects"

const PostedProjects = () => {
    const { user } = useAppSelector(state => state.auth)
    const { data, isPending: loading, isError: err } = useLoadProjects({ employer: user?._id })
    const projects = data?.projects || []

    return (
        <div>
            <h2 className="font-display text-2xl font-bold text-text-dark">My Projects</h2>
            {loading ? <Spinner /> :
                err ? <p className="text-red-500">{err}</p> :
                    projects.length > 0 ? (
                        <div className="mt-5 flex flex-col  gap-2">
                            {projects.map((project) => {
                                const link = project.status === projectStatus.OPEN ? `/project/${project._id}` : `/contract/${project.contract._id}`
                                return <ProjectCard
                                    key={project._id
                                    } project={project}
                                    link={link}
                                />
                            }
                            )}
                        </div>
                    )
                        : <p className="text-gray-500 text-sm">No Posted Projects</p>}
        </div>
    )
}

export default PostedProjects
