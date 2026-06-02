import { useEffect } from "react"
import Spinner from "../components/Spinner"
import { fetchUserProjects } from "../features/projects/projects.reducers"
import { useAppDispatch, useAppSelector } from "../store/store"
import { ProjectCard } from "../components/ProjectCard"

const UserProjects = () => {
    const { user } = useAppSelector(state => state.auth)
    const { projects, loading, err } = useAppSelector(state => state.projects)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (user)
            dispatch(fetchUserProjects(user._id))
    }, [dispatch, user])
    console.log(projects)
    return (
        <div>
            <h2 className="font-display text-2xl font-bold text-text-dark">My Projects</h2>
            {loading && <Spinner size="lg" />}
            {err && <p className="text-red-500">{err}</p>}
            {projects.length > 0 && (
                <div className="mt-5">
                    {projects.map((project) => (
                        <ProjectCard project={project} link={`/contract/${project.contract._id}`} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserProjects
