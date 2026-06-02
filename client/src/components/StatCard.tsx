import { NavLink } from "react-router-dom";

export default function StatCard({
    label,
    value,
    accent,
    positive,
    link
}: {
    label: string;
    value: string;
    accent?: boolean;
    positive?: boolean;
    link?: string
}) {
    return (
        <NavLink to={link || ""} className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-dim">{label}</p>
            <p
                className={
                    "mt-2 font-display text-2xl font-bold tracking-tight " +
                    (accent ? "text-brand" : positive ? "text-success" : "text-text-dark")
                }
            >
                {value}
            </p>
        </NavLink>
    );
}
