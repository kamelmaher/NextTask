import Spinner from "../components/Spinner"
import { ProjectCard } from "../components/ProjectCard"
import { useLoadUserContracts } from "../hooks/useContracts"

const UserProjects = () => {
    const { data, isPending, isError, error } = useLoadUserContracts()
    const contracts = data?.contracts || []
    return (
        <div>
            <h2 className="font-display text-2xl font-bold text-text-dark">Projects Worked on</h2>
            {isPending ? <Spinner size="lg" /> :
                isError ? <p className="text-red-500">{error.message}</p> :
                    contracts.length == 0 ? <p className="text-sm text-gray-500">You dont have any contracts working on</p> :
                        contracts.length > 0 && (
                            <div className="mt-5 flex flex-col gap-2">
                                {contracts.map((contract) => (
                                    <ProjectCard
                                        key={contract._id}
                                        project={contract.project}
                                        link={`/contract/${contract._id}`} />
                                ))}
                            </div>
                        )}
        </div>
    )
}

export default UserProjects
