import { Briefcase, CreditCard, FileText, LayoutGrid, Tag, Users } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";

const tabs = [
    { label: "Projects", to: "/admin" },
    { label: "Users", to: "/admin/users" },
    { label: "Contracts", to: "/admin/contracts" },
    { label: "Categories", to: "/admin/categories" },
    { label: "Payments", to: "/admin/payments" },
];

const tabClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-xl px-4 py-2 text-sm font-semibold transition ${isActive
        ? "bg-primary text-white shadow-lg shadow-primary/20"
        : "bg-surface text-text-dark hover:bg-slate-100"
    }`;

const items = [
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/projects", icon: Briefcase, label: "Projects" },
    { to: "/admin/categories", icon: Tag, label: "Categories" },
    { to: "/admin/contracts", icon: FileText, label: "Contracts" },
    { to: "/admin/payments", icon: CreditCard, label: "Payments" },
]
export default function AdminLayout() {
    return (
        <div className="min-h-screen">
            <div className="mx-auto flex max-w-[1280px] gap-6 px-6 py-8">
                <aside className="hidden w-60 shrink-0 md:block">
                    <div className="rounded-xl border border-border bg-surface p-3">
                        <div className="mb-2 flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                            <LayoutGrid className="h-3.5 w-3.5" /> Admin
                        </div>
                        <nav className="flex flex-col gap-0.5">
                            {items.map((it) => {
                                return (
                                    <NavLink
                                        key={it.to}
                                        to={it.to}
                                        className=
                                        {
                                            ({ isActive }) =>
                                                `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "bg-primary-soft text-primary-dark" : "text-text-body hover:bg-muted"
                                                }`}
                                    >
                                        <it.icon className="h-4 w-4" />
                                        {it.label}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>
                </aside>
                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
