import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import UpdateProfileForm from "../components/UpdateProfileForm";
import Spinner from "../components/Spinner";

export default function ProfilePage() {
    const { user, isAuthenticated, fetchUserLoading, authChecked } = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    useEffect(() => {
        if (fetchUserLoading || !authChecked) return;
        if (!isAuthenticated) navigate("/login")
    }, [isAuthenticated, fetchUserLoading, authChecked, navigate])

    if (fetchUserLoading || !authChecked) {
        return <Spinner size="lg" />
    }

    const fields = [
        { label: "First name", value: user?.firstName },
        { label: "Last name", value: user?.lastName },
        { label: "Email", value: user?.email },
        // { label: "Mobile", value: user?.mobile },
        { label: "Professional title", value: user?.title },
        // { label: "Category", value: user?.category },
    ];
    return (
        <div className="space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="font-display text-2xl font-bold tracking-tight text-text-dark">
                        Profile information
                    </h1>
                    <p className="text-sm text-text-dim">
                        How clients see you on NextStack.
                    </p>
                </div>
                <button
                    className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-dark hover:bg-background"
                    onClick={() => setShowUpdateForm(true)}
                >
                    Edit profile
                </button>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    {fields.map((f) => (
                        <div key={f.label}>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-text-dim">
                                {f.label}
                            </p>
                            <p className="mt-1 text-sm font-medium text-text-dark">{f.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-display text-lg font-bold text-text-dark">About</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-dim">
                    {user?.about}
                </p>
            </div>

            {
                showUpdateForm &&
                <UpdateProfileForm onClose={() => setShowUpdateForm(false)} />
            }
        </div>
    );
}
