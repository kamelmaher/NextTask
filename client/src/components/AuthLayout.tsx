import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export function AuthLayout({
    title,
    subtitle,
    children,
    footer,
}: {
    title: string;
    subtitle: string;
    children: ReactNode;
    footer: ReactNode;
}) {
    return (
        <div className="grid lg:grid-cols-2">
            {/* Brand panel */}
            <div className="relative hidden overflow-hidden bg-text-dark p-12 text-white lg:flex lg:flex-col lg:justify-center  ">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        background:
                            "radial-gradient(600px circle at 20% 20%, rgba(139,92,246,0.4), transparent 60%), radial-gradient(500px circle at 80% 70%, rgba(99,102,241,0.35), transparent 60%)",
                    }}
                />
                <NavLink to="/" className="relative font-display text-2xl font-bold tracking-tight">
                    NextStack
                </NavLink>
                <div className="relative space-y-6">
                    <p className="font-display text-3xl font-semibold leading-tight">
                        Where senior builders find work that respects their craft.
                    </p>
                    <div className="flex items-center gap-3 text-sm text-white/70">
                        <div className="flex -space-x-2">
                            {["AS", "MC", "EK"].map((i) => (
                                <div
                                    key={i}
                                    className="flex size-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold ring-2 ring-text-dark"
                                >
                                    {i}
                                </div>
                            ))}
                        </div>
                        <span>Trusted by 12,400+ freelancers worldwide</span>
                    </div>
                </div>
            </div>

            {/* Form panel */}
            <div className="flex flex-col justify-center px-6 py-12 lg:px-16">
                <div className="mx-auto w-full max-w-md">
                    <NavLink
                        to="/"
                        className="mb-10 inline-block font-display text-xl font-bold text-brand lg:hidden"
                    >
                        NextStack
                    </NavLink>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-text-dark">
                        {title}
                    </h1>
                    <p className="mt-2 text-sm text-text-dim">{subtitle}</p>
                    <div className="mt-8">{children}</div>
                    <p className="mt-8 text-center text-sm text-text-dim">{footer}</p>
                </div>
            </div>
        </div>
    );
}

export function Field({
    label,
    ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-dim">
                {label}
            </span>
            <input
                {...rest}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition-all placeholder:text-text-dim/60 focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
        </label>
    );
}
