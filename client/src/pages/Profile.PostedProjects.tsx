import { useEffect } from "react"
import { ProjectCard } from "../components/ProjectCard"
import Spinner from "../components/Spinner"
import { fetchProjects } from "../features/projects/projects.reducers"
import { useAppSelector, useAppDispatch } from "../store/store"
import { projectStatus } from "../utils/status"

const PostedProjects = () => {
    const { user } = useAppSelector(state => state.auth)
    const { projects, loading, err } = useAppSelector(state => state.projects)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (user) {
            dispatch(fetchProjects({ employer: user._id }))
        }
    }, [dispatch, user])
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
                                    canDelete={true}
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
