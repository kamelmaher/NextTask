import { NavLink } from "react-router-dom";
import type { PortfolioItem } from "../features/portfolio/portfolio.types";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
    return (
        <NavLink
            to={`/portfolio/item/${item._id}`}
            className="group overflow-hidden rounded-2xl border border-border bg-surface flex flex-col h-[350px]"
        >
            {/* IMAGE (max 250px) */}
            <div className="h-[250px] w-full shrink-0">
                <img
                    src={item.cover}
                    alt="cover image"
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
            </div>

            {/* TEXT (takes remaining space = 50px) */}
            <div className="p-3 flex flex-col justify-end flex-1">
                <p className="text-sm font-bold text-text-dark">{item.title}</p>
                <p className="text-xs text-text-dim line-clamp-1">
                    {item.desc}
                </p>
            </div>
        </NavLink>
    );
}
