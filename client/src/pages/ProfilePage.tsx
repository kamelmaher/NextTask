import { useAppSelector } from "../store/store";
import Spinner from "../components/Spinner";
import { StatGrid } from "../components/DashboardUi";
import WalletTopUp from "../components/WalletTopUp";
import { useLoadUserStatics } from "../hooks/useStatics";

export default function ProfilePage() {
    const { data: userStatics, isPending: loading } = useLoadUserStatics()
    const { user } = useAppSelector(state => state.auth)
    return (
        <div className="space-y-6">
            {
                loading ? <Spinner size="lg" /> :
                    userStatics &&
                    <StatGrid stats={[
                        { label: "Balance", value: `$${user?.balance}` },
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

            <WalletTopUp />

        </div>
    );
}