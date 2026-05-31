import { NavLink } from "react-router-dom";
import { projectProposals } from "../data/mockData";
import { ProposalCard } from "../components/ProposalCard";
import ProposalForm from "../components/ProposalForm";

export default function ProjectPage() {
    const project = {
        id: "p-1001",
        title: "Fintech Dashboard & API Integration",
        description:
            "Looking for an expert developer to build a secure dashboard for a neo-banking platform. Requires deep knowledge of React, Node.js and high-security API patterns. Long-term partnership possible for the right talent.",
        category: "Development",
        minPrice: 3500,
        maxPrice: 5000,
        pricingType: "Fixed Price",
        postedAt: "2 hours ago",
        tags: ["TypeScript", "PostgreSQL", "Next.js"],
        client: { name: "Northwind Capital", rating: 4.9, jobsPosted: 24 },
    }
    const proposals = projectProposals
    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto max-w-7xl px-6 py-10">
                <NavLink to="/projects" className="mb-6 inline-block text-sm font-medium text-text-dim hover:text-brand">
                    ← Back to projects
                </NavLink>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main */}
                    <div className="space-y-8 lg:col-span-2">
                        <div className="rounded-2xl border border-border bg-surface p-8">
                            <div className="mb-4 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                                    {project.category}
                                </span>
                                <span className="text-xs text-text-dim">Posted {project.postedAt}</span>
                            </div>
                            <h1 className="font-display text-3xl font-bold tracking-tight text-text-dark">
                                {project.title}
                            </h1>
                            <p className="mt-4 text-base leading-relaxed text-text-dim">
                                {project.description}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {project.tags.map((t: string) => (
                                    <span
                                        key={t}
                                        className="rounded-lg bg-background px-3 py-1 text-xs font-medium text-text-dim"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <ProposalForm />

                        <section>
                            <div className="mb-4 flex items-end justify-between">
                                <h2 className="font-display text-xl font-bold tracking-tight">
                                    Proposals ({proposals.length})
                                </h2>
                                <span className="text-xs text-text-dim">Sorted by recency</span>
                            </div>
                            <div className="space-y-4">
                                {proposals.length === 0 ? (
                                    <p className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-text-dim">
                                        No proposals yet. Be the first to apply.
                                    </p>
                                ) : (
                                    proposals.map((p: typeof proposals[number]) => <ProposalCard key={p.id} proposal={p} />)
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        <div className="rounded-2xl border border-border bg-surface p-6">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-text-dim">
                                Budget
                            </p>
                            <p className="mt-2 font-display text-2xl font-bold tracking-tight text-text-dark">
                                ${project.minPrice.toLocaleString()} — ${project.maxPrice.toLocaleString()}
                            </p>
                            <p className="text-xs text-text-dim">{project.pricingType}</p>
                            <button className="mt-6 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-brand-foreground transition-transform hover:bg-brand/90 active:scale-[0.99]">
                                Submit a proposal
                            </button>
                            <button className="mt-2 w-full rounded-xl border border-border bg-surface py-3 text-sm font-semibold text-text-dark transition-colors hover:bg-background">
                                Save project
                            </button>
                        </div>

                        <div className="rounded-2xl border border-border bg-surface p-6">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-text-dim">
                                About the client
                            </p>
                            <p className="mt-2 font-display text-lg font-bold text-text-dark">
                                {project.client.name}
                            </p>
                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-text-dim">Rating</span>
                                    <span className="font-medium">{project.client.rating} / 5</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-dim">Jobs posted</span>
                                    <span className="font-medium">{project.client.jobsPosted}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
