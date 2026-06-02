import type { Proposal } from "../features/proposal/proposal.types";

const statusStyles: Record<Proposal["status"], string> = {
    pending: "bg-blue-50 text-blue-600",
    accepted: "bg-emerald-50 text-emerald-600",
    declined: "bg-rose-50 text-rose-600",
};

type ProposalCardProps = {
    proposal: Proposal;
    handleAccept: (proposalId: string) => void;
    isEmployer: boolean;
};
export function ProposalCard({ proposal, handleAccept, isEmployer }: ProposalCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
                    {proposal.freelancer.firstName}
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
                        <div className="text-right flex flex-col items-center">
                            <p className="text-base font-bold">${proposal.price}</p>
                            <span
                                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusStyles[proposal.status]}`}
                            >
                                {proposal.status}
                            </span>
                        </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-text-dim">
                        {proposal.content}
                    </p>
                </div>
            </div>
            {
                isEmployer &&
                proposal.status === "pending" &&
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={() => handleAccept(proposal._id)}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                        Accept Proposal
                    </button>
                </div>
            }
        </div>
    );
}
