import { useNavigate } from "react-router-dom";
import { PortfolioCard } from "../components/PortfolioCard";
import Spinner from "../components/Spinner";
import { useAppSelector } from "../store/store";
import { useLoadPortfolios } from "../hooks/usePortfolio";

export default function PortfolioPage() {
    const { user } = useAppSelector(state => state.auth)
    const { data, isPending: loading } = useLoadPortfolios(user?._id || "")
    const items = data?.portfolioItems || []
    const navigate = useNavigate()
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
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <PortfolioCard key={item._id} item={item} />
                        ))}
                    </div>
            }
        </div>
    );
}
