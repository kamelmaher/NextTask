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
            // console.log(user._id)
            dispatch(fetchProjects({ employer: user._id }))
        }
    }, [dispatch, user])

    // console.log(projects)

    if (loading) return <Spinner size="lg" />
    if (projects.length == 0) return
    console.log("projects   ", projects)
    return (
        <div>
            <h2 className="font-display text-2xl font-bold text-text-dark">My Projects</h2>
            {err && <p className="text-red-500">{err}</p>}
            {projects.length > 0 && (
                <div className="mt-5 flex flex-col  gap-2">
                    {projects.map((project) => {
                        const link = project.status === projectStatus.INPROGRESS ? `/contract/${project.contract._id}` : `/project/${project._id}`
                        return <ProjectCard key={project._id
                        } project={project} link={link} />
                    }
                    )}
                </div>
            )}
        </div>
    )
}

export default PostedProjects
