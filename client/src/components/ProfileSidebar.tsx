import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useState } from "react";

const items = [
    { to: "/profile", label: "Profile", exact: true },
    { to: "/profile/portfolio", label: "Portfolio", exact: false },
    { to: "/profile/proposals", label: "Proposals", exact: false },
    { to: "/profile/projects", label: "Projects", exact: false },
    { to: "/profile/posted", label: "Posted Projects", exact: false },
];

export function ProfileSidebar() {
    const { user } = useAppSelector(state => state.auth)
    const [reviews, setReviews] = useState(3.4)
    const [projectsDone, setProjectsDone] = useState(10)
    if (!user) return
    return (
        <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-display text-xl font-bold text-text-dark">
                    {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-text-dim">{user.title}</p>
                <div className="mt-6 space-y-3 border-t border-border pt-6">
                    <p className="font-semibold text-lg text-gray-500">Statics</p>
                    <div className="flex justify-between text-sm">
                        <span className="text-text-dim">Reviews</span>
                        <span className="font-medium text-success">{reviews}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-text-dim">Projects Done</span>
                        <span className="font-medium text-success">{projectsDone}</span>
                    </div>
                    {/* <div className="flex justify-between text-sm">
                        <span className="text-text-dim">Success rate</span>
                        <span className="font-medium text-success">{user.successRate}%</span>
                    </div> */}
                    {/* <div className="flex justify-between text-sm">
                        <span className="text-text-dim">Balance</span>
                        <span className="font-medium">
                            ${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </span>
                    </div> */}
                </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-2">
                <nav className="flex flex-col space-y-1">
                    {items.map((item) => {
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.exact}
                                className={
                                    ({ isActive }) =>
                                        `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-brand-soft text-brand" : "text-text"}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>
        </aside >
    );
}
