import { Link } from "react-router-dom";

export default function WalletSuccess() {
    return (
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-surface p-10 text-center">
            <h1 className="text-2xl font-bold text-text-dark">Payment success</h1>
            <p className="mt-4 text-sm text-text-dim">
                Your wallet has been updated. You can return to your profile to continue.
            </p>
            <Link to="/profile" className="mt-6 inline-flex rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark">
                Go to Profile
            </Link>
        </div>
    );
}
