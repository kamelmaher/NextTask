import { useState, type FormEvent } from "react";
import { useAppSelector } from "../store/store";
import { api } from "../lib/axios";
import Spinner from "./Spinner";

export default function WalletTopUp() {
    const { user } = useAppSelector(state => state.auth);
    const [amount, setAmount] = useState(10);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const quickAmounts = [10, 25, 50, 100];

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setMessage(null);

        if (!amount || amount < 1) {
            setError("Please enter an amount of at least $1.");
            return;
        }

        setLoading(true);
        try {
            const response = await api.post("/payment/dposite", { amount });
            const url = response.data?.url;
            if (!url) {
                throw new Error("Unable to create checkout session.");
            }
            window.location.href = url;
        } catch (err) {
            setError("Could not start checkout.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="font-display text-lg font-bold text-text-dark">Wallet top-up</h2>
                    <p className="mt-1 text-sm text-text-dim">
                        Add funds to your wallet and complete payments faster.
                    </p>
                </div>
                <div className="rounded-2xl bg-background px-4 py-3 text-sm font-medium text-text-dark">
                    Balance: ${user?.balance?.toFixed(2) ?? "0.00"}
                </div>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-text-dim">
                    Deposit amount
                    <input
                        type="number"
                        min={1}
                        value={amount}
                        onChange={(event) => setAmount(Number(event.target.value))}
                        className="mt-2 w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm text-text-dark outline-none transition focus:border-brand"
                    />
                </label>

                <div className="flex flex-wrap gap-2">
                    {quickAmounts.map((value) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setAmount(value)}
                            className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${amount === value ? "border-brand bg-brand/10 text-brand" : "border-border bg-surface text-text"}`}
                        >
                            ${value}
                        </button>
                    ))}
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}
                {message && <p className="text-sm text-green-600">{message}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? <Spinner size="sm" label="Starting checkout..." /> : "Deposit with Stripe"}
                </button>
            </form>
        </div>
    );
}
