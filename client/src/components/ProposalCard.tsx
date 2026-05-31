import type { Proposal } from "../features/proposal/proposal.types";

const statusStyles: Record<Proposal["status"], string> = {
    "Under Review": "bg-blue-50 text-blue-600",
    Interviewing: "bg-orange-50 text-orange-600",
    Accepted: "bg-emerald-50 text-emerald-600",
    Declined: "bg-rose-50 text-rose-600",
};

export function ProposalCard({ proposal }: { proposal: Proposal }) {
    return (
        <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
                    {proposal.freelancer.firstName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <p className="text-sm font-semibold text-text-dark">
                                {proposal.freelancer.firstName} {proposal.freelancer.lastName}
                                <span className="ml-2 font-normal text-text-dim">
                                    • {proposal.freelancer.title}
                                </span>
                            </p>
                            {/* <p className="text-xs text-text-dim">Submitted {proposal.submittedAt}</p> */}
                        </div>
                        <div className="text-right">
                            <p className="text-base font-bold">${proposal.price}</p>
                            <span
                                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusStyles[proposal.status]}`}
                            >
                                {proposal.status}
                            </span>
                        </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-text-dim">{proposal.content}</p>
                </div>
            </div>
        </div>
    );
}
