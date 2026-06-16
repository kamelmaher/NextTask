import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { CheckCircle, Star } from "lucide-react";

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
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#F8FAFC]">
            {/* Brand panel - Creative Design */}
            <div className="relative hidden overflow-hidden bg-[#0F172A] text-white lg:flex lg:flex-col lg:justify-between p-12">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#7C3AED]/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#A78BFA]/10 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-[#7C3AED]/5 blur-2xl" />
                </div>

                {/* Top Section */}
                <div className="relative z-10">
                    <NavLink to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C3AED]">
                            <span className="text-white font-bold text-sm">N</span>
                        </div>
                        <span>NextTask</span>
                    </NavLink>
                </div>

                {/* Middle Section - Creative Widget */}
                <div className="relative z-10 space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold leading-tight mb-4">
                            Where senior builders<br />
                            <span className="text-[#A78BFA]">find work that respects</span><br />
                            their craft.
                        </h2>
                        <p className="text-[#94A3B8] text-sm max-w-sm">
                            Join thousands of top-tier freelancers who choose NextTask for meaningful projects and fair compensation.
                        </p>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-3">
                        {[
                            "Secure escrow payments",
                            "Verified clients only",
                            "Zero commission fees",
                            "Instant withdrawals"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="h-5 w-5 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
                                    <CheckCircle className="h-3 w-3 text-[#A78BFA]" />
                                </div>
                                <span className="text-sm text-[#CBD5E1]">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section - Social Proof Widget */}
                <div className="relative z-10">
                    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex -space-x-2">
                                {["AS", "MC", "EK", "JD"].map((i) => (
                                    <div
                                        key={i}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/30 text-xs font-semibold ring-2 ring-[#0F172A]"
                                    >
                                        {i}
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-[#94A3B8]">
                            <span className="text-white font-semibold">12,400+</span> freelancers worldwide trust NextTask
                        </p>
                    </div>
                </div>
            </div>

            {/* Form panel */}
            <div className="flex flex-col justify-center px-6 py-12 lg:px-16">
                <div className="mx-auto w-full max-w-md">
                    <NavLink
                        to="/"
                        className="mb-8 inline-flex items-center gap-2 font-bold text-xl text-[#7C3AED] lg:hidden"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C3AED]">
                            <span className="text-white font-bold text-sm">N</span>
                        </div>
                        NextTask
                    </NavLink>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">
                            {title}
                        </h1>
                        <p className="mt-2 text-sm text-[#64748B]">{subtitle}</p>
                    </div>

                    <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-sm">
                        {children}
                    </div>

                    <p className="mt-6 text-center text-sm text-[#64748B]">{footer}</p>
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
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                {label}
            </span>
            <input
                {...rest}
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#F3E8FF]"
            />
        </label>
    );
}