import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PortfolioCard } from "../components/PortfolioCard";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getPortfolioItems } from "../features/portfolio/portfolio.reducer";

export default function PortfolioPage() {
    const { items, loading, error } = useAppSelector(state => state.portfolio)
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) return
        dispatch(getPortfolioItems(user._id))
    }, [dispatch, user])
    return (
        <div className="space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="font-display text-2xl font-bold tracking-tight text-text-dark">
                        Portfolio
                    </h1>
                    <p className="text-sm text-text-dim">
                        {items.length} pieces of work
                    </p>
                </div>
                <button onClick={() => navigate("/portfolio/new")} className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand/90">
                    + Add item
                </button>
            </div>
            {
                loading ? <Spinner size="md" /> :
                    error ? <p className="text-sm text-red-500">{error}</p> :
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((item) => (
                                <PortfolioCard key={item._id} item={item} />
                            ))}
                        </div>
            }
        </div>
    );
}
