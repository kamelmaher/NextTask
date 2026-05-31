import type { PortfolioItem } from "../data/mockData";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-border bg-surface">
            <div
                className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
                style={{ background: item.cover }}
            />
            <div className="p-4">
                <p className="text-sm font-bold text-text-dark">{item.title}</p>
                <p className="text-xs text-text-dim">
                    {item.category} • {item.year}
                </p>
            </div>
        </div>
    );
}
