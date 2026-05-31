import { useParams } from "react-router-dom";
import { ProposalCard } from "../components/ProposalCard";
import ProposalForm from "../components/ProposalForm";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { fetchSingleProject } from "../features/projects/projects.reducers";
import { getProposals } from "../features/proposal/proposal.reducer";
import Spinner from "../components/Spinner";

export default function ProjectPage() {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { project, loading: projectLoading, err: projectErr } = useAppSelector(state => state.projects)
    const { proposals, loading: proposalLoading, err: proposalErr } = useAppSelector(state => state.proposal)
    useEffect(() => {
        dispatch(fetchSingleProject(id || ""))
    }, [id, dispatch])

    useEffect(() => {
        if (project)
            dispatch(getProposals(id || ""))
    }, [id, dispatch, project])

    const projectDetails = [
        { label: "Budget", value: `$${project.minPrice} - $${project.maxPrice}` },
        { label: "Duration", value: `${project.deliveryDuration} days` },
        { label: "Status", value: project.status },
        { label: "Posted At", value: new Date(project.createdAt).toLocaleDateString("en-GB") },
    ]
    return (
        <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
            {
                projectLoading ? (
                    <Spinner size="lg" />
                ) : projectErr ? (
                    <p>Error loading project details.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 ">
                        {/* Main Content */}
                        <div className="space-y-8 lg:col-span-2">
                            {/* Project Details */}
                            <div className="rounded-2xl border border-border bg-surface p-8
                    order-1 lg:order-1 lg:col-span-2">
                                <h1 className="font-display text-3xl font-bold tracking-tight text-text-dark">
                                    {project.title}
                                </h1>

                                <p className="mt-4 text-base leading-relaxed text-text-dim">
                                    {project.desc}
                                </p>
                            </div>

                            {/* Sidebar */}
                            <aside className="space-y-6 order-2 lg:order-2">
                                <div className="rounded-2xl border border-border bg-surface p-6">
                                    {projectDetails.map((detail) => (
                                        <div
                                            key={detail.label}
                                            className="mt-3 flex items-center justify-between"
                                        >
                                            <p className="font-medium tracking-wider">
                                                {detail.label}
                                            </p>

                                            <p className="font-display text-xl font-bold tracking-tight text-blue-500">
                                                {detail.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="rounded-2xl border border-border bg-surface p-6">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-dim">
                                        About the client
                                    </p>

                                    <p className="mt-2 font-display text-lg font-bold text-text-dark">
                                        {project.employer &&
                                            `${project.employer.firstName} ${project.employer.lastName}`}
                                    </p>

                                    <div className="mt-4 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-text-dim">Rating</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-text-dim">Jobs posted</span>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            {/* Proposal Form */}
                            <div className="order-3 lg:order-3 lg:col-span-2">
                                <ProposalForm projectId={project._id} />
                            </div>

                            {/* Proposals */}
                            <section className="order-4 lg:order-4 lg:col-span-2">
                                <div className="mb-4 flex items-end justify-between">
                                    <h2 className="font-display text-xl font-bold tracking-tight">
                                        Proposals ({proposals.length})
                                    </h2>

                                    <span className="text-xs text-text-dim">
                                        Sorted by recency
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {proposalLoading ? (
                                        <p>Loading proposals...</p>
                                    ) : proposals.length === 0 ? (
                                        <p className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-text-dim">
                                            No proposals yet. Be the first to apply.
                                        </p>
                                    ) : (
                                        proposals.map((p) => (
                                            <ProposalCard
                                                key={p._id}
                                                proposal={p}
                                            />
                                        ))
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                )
            }
        </div>
    );
}