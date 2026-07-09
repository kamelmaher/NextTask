import { User, Image, FileText, Hammer, Megaphone, Star } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useState } from "react";
import UpdateProfileForm from "../components/UpdateProfileForm";


const items: { to: string; icon: typeof User; label: string; exact?: boolean }[] = [
    { to: "/profile", icon: User, label: "Profile", exact: true },
    { to: "/profile/portfolio", icon: Image, label: "Portfolio" },
    { to: "/profile/proposals", icon: FileText, label: "Proposals" },
    { to: "/profile/projects", icon: Hammer, label: "Working on" },
    { to: "/profile/posted", icon: Megaphone, label: "Posted projects" },
];

export default function ProfilePage() {
    const { user } = useAppSelector(state => state.auth)
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    return (
        <div className="min-h-screen">
            {/* Profile header */}
            {
                user &&
                <div className="border-b border-border bg-surface">
                    <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-5 px-6 py-8">
                        <div className="grid h-20 w-20 place-items-center rounded-full gradient-hero text-2xl font-bold text-white shadow-brand">
                            {user.firstName.charAt(0)} {user.lastName.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-text-dark">{user.firstName} {user.lastName}</h1>
                            </div>
                            <p className="mt-1 text-text-body">{user.title}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-text-muted">
                                <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> 4.96 (218 reviews)</span>
                            </div>
                        </div>
                        <button
                            className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary"
                            onClick={() => setShowUpdateForm(true)}
                        >
                            Edit profile
                        </button>
                    </div>
                </div>
            }

            {/* Mobile horizontal tabs (visible on small screens) */}
            <div className="mx-auto max-w-[1280px] px-6 md:hidden">
                <div className="rounded-xl border border-border bg-surface p-2 my-4">
                    <nav className="flex gap-2 overflow-x-auto">
                        {items.map((it) => {
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
                    <nav className="sticky top-20 rounded-xl border border-border bg-surface p-3">
                        {items.map((it) => {
                            return (
                                <NavLink
                                    key={it.to}
                                    to={it.to}
                                    end
                                    className={
                                        ({ isActive }) =>
                                            `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-primary-soft text-primary-dark" : "text-text-body hover:bg-muted"
                                            }`}
                                >
                                    <it.icon className="h-4 w-4" />
                                    {it.label}
                                </NavLink>
                            );
                        })}
                    </nav>
                </aside>
                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>

            {
                showUpdateForm &&
                <UpdateProfileForm onClose={() => setShowUpdateForm(false)} />
            }
        </div>
    );
}
