import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";

const items = [
    { to: "/profile", label: "Profile", exact: true },
    { to: "/profile/portfolio", label: "Portfolio", exact: false },
    { to: "/profile/proposals", label: "Proposals", exact: false },
    { to: "/profile/projects", label: "Projects", exact: false },
    { to: "/profile/posted", label: "Posted Projects", exact: false },
];

export function ProfileSidebar() {
    const { user } = useAppSelector(state => state.auth)
    if (!user) return
    return (
        <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-display text-xl font-bold text-text-dark">
                    {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-text-dim">{user.title}</p>

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
