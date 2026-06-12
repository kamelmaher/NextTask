import { NavLink, Outlet } from "react-router-dom";

const tabs = [
    { label: "Projects", to: "/admin" },
    { label: "Users", to: "/admin/users" },
    { label: "Contracts", to: "/admin/contracts" },
    { label: "Categories", to: "/admin/categories" },
];

const tabClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-xl px-4 py-2 text-sm font-semibold transition ${isActive
        ? "bg-primary text-white shadow-lg shadow-primary/20"
        : "bg-surface text-text-dark hover:bg-slate-100"
    }`;

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-text-dark">Admin Panel</h1>
                        <p className="text-text-dim">Manage projects, users, and contracts from one place.</p>
                    </div>
                </div>
                <nav className="mb-2 flex flex-wrap gap-3 rounded-3xl border border-border bg-surface p-3 shadow-sm">
                    {tabs.map((tab) => (
                        <NavLink key={tab.to} to={tab.to} className={tabClass} end={tab.to === "/admin"}>
                            {tab.label}
                        </NavLink>
                    ))}
                </nav>
                <Outlet />
            </div>
        </div>
    );
}
