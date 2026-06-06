import { useEffect } from "react"
import Spinner from "../components/Spinner"
import { useAppDispatch, useAppSelector } from "../store/store"
import { ProjectCard } from "../components/ProjectCard"
import { getContracts } from "../features/contract/contract.reducer"

const UserProjects = () => {
    const { user } = useAppSelector(state => state.auth)
    const { contracts, loading, err } = useAppSelector(state => state.contract)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (user) {
            dispatch(getContracts({ freelancer: user._id }))
        }
    }, [dispatch, user])
    return (
        <div>
            <h2 className="font-display text-2xl font-bold text-text-dark">Projects Worked on</h2>
            {loading ? <Spinner size="lg" /> :
                err ? <p className="text-red-500">{err}</p> :
                    contracts.length == 0 ? <p className="text-sm text-gray-500">You dont have any projects working on</p>:
            contracts.length > 0 && (
            <div className="mt-5 flex flex-col gap-2">
                {contracts.map((contract) => (
                    <ProjectCard key={contract._id} project={contract.project} link={`/contract/${contract._id}`} />
                ))}
            </div>
            )}
        </div>
    )
}

export default UserProjects
