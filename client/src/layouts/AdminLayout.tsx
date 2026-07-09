import { Briefcase, CreditCard, FileText, LayoutDashboard, Tag, Users } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const tabs = [
    { to: "/admin", icon: LayoutDashboard, label: "Admin" },
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/projects", icon: Briefcase, label: "Projects" },
    { to: "/admin/categories", icon: Tag, label: "Categories" },
    { to: "/admin/contracts", icon: FileText, label: "Contracts" },
    { to: "/admin/transactions", icon: CreditCard, label: "Payments" },
]
export default function AdminLayout() {

    return (
        <div className="min-h-screen">
            {/* Mobile horizontal tabs (moved outside main flex to avoid layout issues) */}
            <div className="mx-auto max-w-[1280px] px-6 md:hidden">
                <div className="rounded-xl border border-border bg-surface p-2 my-4">
                    <nav className="flex gap-2 overflow-x-auto">
                        {tabs.map((it) => {
                            return (
                                <NavLink
                                    key={it.to}
                                    to={it.to}
                                    end
                                    className={({ isActive }) =>
                                        `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "bg-primary-soft text-primary-dark" : "text-text-body hover:bg-muted"}`
                                    }
                                >
                                    <it.icon className="h-4 w-4" />
                                    {it.label}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <div className="mx-auto flex max-w-[1280px] gap-6 px-6 py-8">
                <aside className="hidden w-60 shrink-0 md:block">
                    <div className="rounded-xl border border-border bg-surface p-3">
                        <nav className="flex flex-col gap-0.5">
                            {tabs.map((it) => {
                                return (
                                    <NavLink
                                        key={it.to}
                                        to={it.to}
                                        end
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
