import { Link } from "react-router-dom";

export default function WalletCancel() {
    return (
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-surface p-10 text-center">
            <h1 className="text-2xl font-bold text-text-dark">Payment canceled</h1>
            <p className="mt-4 text-sm text-text-dim">
                Your deposit was canceled. You can try again from your profile page.
            </p>
            <Link to="/profile" className="mt-6 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark">
                Back to Profile
            </Link>
        </div>
    );
}