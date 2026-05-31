import { PortfolioCard } from "../components/PortfolioCard";
import { portfolioItems } from "../data/mockData";


export default function PortfolioPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="font-display text-2xl font-bold tracking-tight text-text-dark">
                        Portfolio
                    </h1>
                    <p className="text-sm text-text-dim">
                        {portfolioItems.length} pieces of work
                    </p>
                </div>
                <button className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand/90">
                    + Add item
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((item) => (
                    <PortfolioCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
