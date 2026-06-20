import { useAppSelector } from "../store/store";
import Spinner from "../components/Spinner";
import { StatGrid } from "../components/DashboardUi";

export default function ProfilePage() {
    const { userStatics, loading } = useAppSelector(state => state.statics)
    const { user } = useAppSelector(state => state.auth)
    return (
        <div className="space-y-6">
            {
                loading ? <Spinner size="lg" /> :
                    userStatics &&
                    <StatGrid stats={[
                        { label: "Total earned", value: `$${userStatics.totalEarned}` },
                        { label: "Jobs done", value: `${userStatics.finishedWork}` },
                        { label: "Total Proposals", value: `${userStatics.proposalsCount}` },
                        { label: "Pending Proposals", value: `${userStatics.pendingProposals}` },
                        { label: "total Posted Projects", value: `${userStatics.postedProjects}` },
                    ]} />
            }

            <div className="rounded-xl border border-border bg-surface p-6">
                <h2 className="text-lg font-semibold text-text-dark">About</h2>
                <p className="mt-3 leading-7 text-text-body">
                    {user?.about}
                </p>
            </div>
            {/* Skills */}
            {/* <div className="rounded-xl border border-border bg-surface p-6">
                <h2 className="text-lg font-semibold text-text-dark">Skills</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind CSS", "Figma", "Design Systems", "Framer Motion", "Node.js", "PostgreSQL", "Next.js", "Product Strategy"].map((s) => (
                        <span key={s} className="rounded-full bg-primary-soft px-3 py-1.5 text-sm font-medium text-primary-dark">{s}</span>
                    ))}
                </div>
            </div> */}

            {/* History */}
            <div className="rounded-xl border border-border bg-surface p-6">
                <h2 className="text-lg font-semibold text-text-dark">Work history</h2>
                <ul className="mt-4 space-y-4">
                    {[
                        { title: "SaaS marketing site redesign", client: "Sarah Chen", rating: 5, comment: "Elena exceeded expectations. Pixel-perfect, fast, and thoughtful." },
                        { title: "iOS app onboarding flow", client: "Marcus Rivera", rating: 5, comment: "One of the best designers I've worked with. Will hire again." },
                        { title: "Brand identity package", client: "Aiko Tanaka", rating: 4.8, comment: "Beautiful work and great communication throughout." },
                    ].map((w) => (
                        <li key={w.title} className="border-l-2 border-primary-soft pl-4">
                            <p className="font-medium text-text-dark">{w.title}</p>
                            <p className="text-xs text-text-muted">{w.client} · ⭐ {w.rating}</p>
                            <p className="mt-1 text-sm italic text-text-body">"{w.comment}"</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}