import { NavLink } from "react-router-dom";
import Spinner from "./Spinner";

export default function StatCard({
    label,
    value,
    accent,
    positive,
    link,
    loading
}: {
    label: string;
    value: string;
    accent?: boolean;
    positive?: boolean;
    link?: string,
    loading?: boolean
}) {
    return (
        <div className="rounded-2xl border border-border bg-surface p-6">
            {
                loading ? <Spinner size="md" /> :
                    <NavLink to={link || ""} >
                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-dim">{label}</p>
                        <p
                            className={
                                "mt-2 font-display text-2xl font-bold tracking-tight" +
                                (accent ? "text-brand" : positive ? "text-success" : "text-text-dark")
                            }
                        >
                            {value}
                        </p>
                    </NavLink>
            }
        </div>
    );
}
