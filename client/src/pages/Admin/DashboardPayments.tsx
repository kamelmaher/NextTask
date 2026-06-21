import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getTransactions } from "../../features/transactions/transactions.reducer";
import { StatGrid } from "../../components/DashboardUi";
import { getTransactionStatics } from "../../features/statics/statics.reducer";


export default function DashboardPayments() {
    const [tab, setTab] = useState<"deposit" | "withdraw" | "transfer">("deposit");
    const { transactions, loading, err } = useAppSelector(state => state.transactions)
    const { transactionStatics, loading: staticsLoading } = useAppSelector(state => state.statics)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getTransactionStatics())
        dispatch(getTransactions(tab))
    }, [tab, dispatch])

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-text-dark">Payments & Transactions</h1>
                    <p className="text-text-dim">Track deposits, withdraws and transfers performed in the system.</p>
                </div>
                {
                    staticsLoading ? <Spinner /> :
                        transactionStatics &&
                        <StatGrid stats={[
                            { label: "Total Deposits", value: `$${transactionStatics.depositValue || 0}` },
                            { label: "Total Withdraws", value: `$${transactionStatics.withdrawsValue || 0}` },
                            { label: "Total Transfers", value: `$${transactionStatics.totalTransfers || 0}` },
                        ]} />
                }
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

                        <table className="w-full border-collapse text-sm">
                            <thead className="bg-background text-left text-text-dim">
                                <tr>
                                    {
                                        tab == "transfer" && <>
                                            <th className="px-6 py-4">from</th>
                                            <th className="px-6 py-4">to</th>
                                            <th className="px-6 py-4">Contract</th>
                                        </>
                                    }
                                    {
                                        tab !== "transfer" &&
                                        <th className="px-6 py-4">User</th>
                                    }
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => (
                                    <tr key={transaction._id} className="border-t border-border hover:bg-slate-50">
                                        {
                                            transaction.fromUser &&
                                            <>
                                                <td className="px-6 py-4">{transaction.fromUser.firstName} {transaction.fromUser.lastName}</td>
                                                <td className="px-6 py-4">{transaction.toUser?.firstName} {transaction.toUser?.lastName}</td>
                                                <td className="px-6 py-4">{transaction.contract?.project?.title}</td>
                                            </>
                                        }
                                        {
                                            transaction.user &&
                                            <td className="px-6 py-4"> {transaction.user.firstName} {transaction.user.lastName}</td>
                                        }
                                        <td className="px-6 py-4">${transaction.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4">{transaction.status}</td>
                                        <td className="px-6 py-4">{new Date(transaction.createdAt).toLocaleDateString("en-GB")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div >
    )
}


