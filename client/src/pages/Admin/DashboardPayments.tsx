import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { api } from "../../lib/axios";

type Deposit = { _id: string; user?: any; amount: number; createdAt: string };
type Withdraw = { _id: string; user?: any; amount: number; status: string; createdAt: string };
type Transfer = { _id: string; fromUser?: any; toUser?: any; contract?: any; status: string; createdAt: string };

export default function DashboardPayments() {
    const [tab, setTab] = useState<"deposit"|"withdraw"|"transfer">("deposit");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [deposits, setDeposits] = useState<Deposit[]>([]);
    const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
    const [transfers, setTransfers] = useState<Transfer[]>([]);

    useEffect(() => {
        fetchAll()
    }, []);

    const fetchAll = async () => {
        setLoading(true);
        setErr(null);
        try {
            // Try to fetch by type; backend endpoints may vary — adapt if needed
            const [d, w, t] = await Promise.all([
                api.get("/transaction", { params: { type: "deposite" } }),
                api.get("/transaction", { params: { type: "withdraw" } }),
                api.get("/transaction", { params: { type: "transfer" } }),
            ]);
            setDeposits(d.data.transactions || []);
            setWithdraws(w.data.transactions || []);
            setTransfers(t.data.transactions || []);
        } catch (e: any) {
            setErr(e?.response?.data?.msg || e.message || "Failed to load transactions");
        } finally {
            setLoading(false);
        }
    }

    const fmtDate = (s?: string) => s ? new Date(s).toLocaleString() : "-";

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-text-dark">Payments & Transactions</h1>
                    <p className="text-text-dim">Track deposits, withdraws and transfers performed in the system.</p>
                </div>

                <div className="mb-6 flex gap-2">
                    <button onClick={() => setTab("deposit")} className={`px-4 py-2 rounded ${tab === "deposit" ? "bg-primary text-white" : "bg-surface border"}`}>Deposits</button>
                    <button onClick={() => setTab("withdraw")} className={`px-4 py-2 rounded ${tab === "withdraw" ? "bg-primary text-white" : "bg-surface border"}`}>Withdraws</button>
                    <button onClick={() => setTab("transfer")} className={`px-4 py-2 rounded ${tab === "transfer" ? "bg-primary text-white" : "bg-surface border"}`}>Transfers</button>
                </div>

                {err && <p className="text-red-500 mb-4">{err}</p>}

                {loading ? (
                    <Spinner label="Loading transactions..." />
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                        {tab === "deposit" && (
                            <table className="w-full border-collapse text-sm">
                                <thead className="bg-background text-left text-text-dim">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deposits.map(d => (
                                        <tr key={d._id} className="border-t border-border hover:bg-slate-50">
                                            <td className="px-6 py-4">{d.user ? `${d.user.firstName || ""} ${d.user.lastName || ""}` : "—"}</td>
                                            <td className="px-6 py-4">${d.amount.toFixed(2)}</td>
                                            <td className="px-6 py-4">{fmtDate(d.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {tab === "withdraw" && (
                            <table className="w-full border-collapse text-sm">
                                <thead className="bg-background text-left text-text-dim">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {withdraws.map(wd => (
                                        <tr key={wd._id} className="border-t border-border hover:bg-slate-50">
                                            <td className="px-6 py-4">{wd.user ? `${wd.user.firstName || ""} ${wd.user.lastName || ""}` : "—"}</td>
                                            <td className="px-6 py-4">${wd.amount.toFixed(2)}</td>
                                            <td className="px-6 py-4">{wd.status}</td>
                                            <td className="px-6 py-4">{fmtDate(wd.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {tab === "transfer" && (
                            <table className="w-full border-collapse text-sm">
                                <thead className="bg-background text-left text-text-dim">
                                    <tr>
                                        <th className="px-6 py-4">From</th>
                                        <th className="px-6 py-4">To</th>
                                        <th className="px-6 py-4">Contract</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transfers.map(tr => (
                                        <tr key={tr._id} className="border-t border-border hover:bg-slate-50">
                                            <td className="px-6 py-4">{tr.fromUser ? `${tr.fromUser.firstName || ""} ${tr.fromUser.lastName || ""}` : "—"}</td>
                                            <td className="px-6 py-4">{tr.toUser ? `${tr.toUser.firstName || ""} ${tr.toUser.lastName || ""}` : "—"}</td>
                                            <td className="px-6 py-4">{tr.contract?.title || "—"}</td>
                                            <td className="px-6 py-4">{tr.status}</td>
                                            <td className="px-6 py-4">{fmtDate(tr.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
