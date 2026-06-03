import { NavLink } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import StatCard from "../components/StatCard";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchProjects } from "../features/projects/projects.reducers";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { getContracts } from "../features/contract/contract.reducer";
import { getProposals } from "../features/proposal/proposal.reducer";
import { contractStatus, proposalStatus } from "../utils/status";

export const HomePage = () => {
    const { user, isAuthenticated, fetchUserLoading } = useAppSelector(state => state.auth)
    const { projects, loading } = useAppSelector(state => state.projects)
    const { contracts, loading: contractLoading } = useAppSelector(state => state.contract)
    const { proposals, loading: proposalsLoading } = useAppSelector(state => state.proposal)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProjects({}))
        dispatch(getContracts({ status: contractStatus.INPROGRESS, freelancer: user?._id }))
        if (user)
            dispatch(getProposals({ status: proposalStatus.PENDING, userId: user?._id }))
    }, [dispatch, user])

    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto max-w-7xl px-6 py-10">
                {fetchUserLoading ? <Spinner size="lg" /> : !isAuthenticated ?
                    <section className="mb-8 rounded-2xl border border-border bg-surface p-8 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-display font-bold text-text-dark">
                                    Find Talent. Get Work Done. Fast.
                                </h1>
                                <p className="mt-2 text-text-dim max-w-xl">
                                    NextStack connects talented developers with meaningful
                                    projects — browse, bid, and get hired.
                                </p>
                            </div>
                            <div className="mt-4 flex gap-3">
                                <NavLink
                                    to={'/projects'}
                                    className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground">
                                    Explore Projects
                                </NavLink>

                                <NavLink
                                    to={'/register'}
                                    className="rounded-full border border-border px-5 py-2 text-sm font-semibold">
                                    Become a Freelancer
                                </NavLink>
                            </div>
                        </div>
                    </section>
                    :
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            {/* Auth header + stats */}
                            {user && (
                                <header className="mb-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-text-dim">Welcome back,</p>
                                        <h1 className="font-display text-2xl font-bold tracking-tight text-text-dark">
                                            {user.firstName} {user.lastName} • <span className="text-sm font-medium text-text-dim">{user.title}</span>
                                        </h1>
                                    </div>
                                </header>
                            )}

                            {user && (
                                <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <StatCard
                                        label="Balance"
                                        value={`${(user.balance || 0).toFixed(2)}$`}
                                        accent />

                                    <StatCard
                                        label="In Progress"
                                        value={contracts.length.toString()}
                                        link="/profile/projects"
                                        loading={contractLoading}
                                    />

                                    <StatCard label="Pending Proposals" value={proposals.length.toString()} link="/profile/proposals"
                                        loading={proposalsLoading}
                                    />
                                </section>
                            )}
                        </div>
                    </div>
                }

                {/* Projects list */}
                <div className="mb-6">
                    <h2 className="font-display text-2xl font-bold tracking-tight text-text-dark">Recommended Projects</h2>
                    {!isAuthenticated && <p className="text-sm text-text-dim">Browse available freelance opportunities</p>}

                    <div className="mt-2">
                        {loading ? <Spinner size="md" /> :
                            projects.length === 0 ? (
                                <p className="text-sm text-text-dim">No projects found. Check back later!</p>
                            ) :
                                projects.map((project) => (
                                    <ProjectCard key={project._id} project={project} />
                                ))}
                    </div>
                </div>
            </main>
        </div>
    );
};