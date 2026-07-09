/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { ProposalCard } from "../components/ProposalCard";
import ProposalForm from "../components/ProposalForm";
import { useAppSelector } from "../store/store";
import { useMemo } from "react";
import Spinner from "../components/Spinner";
import { Clock, Briefcase, Star, DollarSign } from "lucide-react";
import { useLoadProject } from "../hooks/useProjects";
import { useLoadProposalsByProject } from "../hooks/useProposal";

export default function ProjectPage() {
    const { id } = useParams()
    const { data, isPending: projectLoading } = useLoadProject(id || "")
    const project = data?.project || null
    const { data: proposalsData, isPending } = useLoadProposalsByProject(id || "")
    const proposals = proposalsData?.proposals || []
    const user = useAppSelector(state => state.auth.user)

    const isEmployer = useMemo(() => {
        return user?._id === project?.employer?._id
    }, [user, project?.employer?._id]);

    const haveProposal = useMemo(() => {
        if (!user) return false
        const foundProposal = proposals.find(proposal => proposal.freelancer._id === user._id)
        if (foundProposal) return true
        return false
    }, [proposals, user])

    if (projectLoading) return <Spinner size="lg" />
    if (!project) return

    return (
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 py-10 lg:grid-cols-[1fr_360px]">
            {/* Main column */}
            <div className="space-y-6">
                {/* Header */}
                <div className="rounded-xl border border-border bg-surface p-7">
                    <div className="flex items-center gap-2">
                        <span className="p-2 rounded-3xl bg-primary/70 text-white text-sm">
                            {project.category.title}
                        </span>
                        <span className="p-2 rounded-3xl bg-primary/70 text-white text-sm">
                            {project.status}
                        </span>
                    </div>
                    <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-text-dark">
                        {project.title}
                    </h1>
                    <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-text-muted">
                        <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" /> Posted {new Date(project.createdAt).toLocaleDateString("en-GB")}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" /> {project.deliveryDuration} days
                        </span>
                        <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" /> {project.minPrice} - {project.maxPrice}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <div className="rounded-xl border border-border bg-surface p-7">
                    <h2 className="font-display text-xl font-semibold text-text-dark">
                        Project description
                    </h2>
                    <p className="mt-4 leading-7 text-text-body">{project.desc}</p>
                </div>

                {user && !isEmployer && !haveProposal && (
                    <ProposalForm project={project} />
                )}

                {/* Proposals list */}
                <section>
                    {
                        isPending ? <Spinner /> : (
                            <>
                                <div className="mb-4 flex items-end justify-between">
                                    <h2 className="font-display text-xl font-bold tracking-tight text-text-dark">
                                        Proposals ({proposals.length})
                                    </h2>
                                    <span className="text-xs text-text-muted">Sorted by recency</span>
                                </div>
                                <div className="space-y-3">
                                    {proposals.length === 0 ? (
                                        <p className="rounded-xl border border-dashed border-border bg-surface p-8 text-center text-sm text-text-muted">
                                            No proposals yet. Be the first to apply.
                                        </p>
                                    ) : (
                                        proposals.map((pr) => (
                                            <ProposalCard
                                                key={pr._id}
                                                proposal={pr}
                                                isEmployer={isEmployer}
                                            />
                                        ))
                                    )}
                                </div>
                            </>
                        )
                    }
                </section>
            </div >

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start" >
                <div className="rounded-xl border border-border bg-surface p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        About the client
                    </h3>
                    <div className="mt-4 flex items-center gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary-dark">
                            KF
                        </div>
                        <div>
                            <p className="font-semibold text-text-dark">{project.employer.firstName} {project.employer.lastName}</p>
                            <p className="text-sm text-gray-500">{project.employer.title}</p>
                            <p className="flex items-center gap-1 text-xs text-text-muted">
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
                        <Row
                            label="Rating"
                            value={
                                <span className="flex items-center gap-1">
                                    <Star className="h-3.5 w-3.5 fill-warning text-warning" />4
                                </span>
                            }
                        />
                        <Row label="Member since" value={`${new Date(project.employer.createdAt).toLocaleDateString("en-GB")}`} />
                    </div>
                </div>
            </aside>
        </div >
    );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-text-muted">{label}</span>
            <span className="text-text-body">{value}</span>
        </div>
    );
}
