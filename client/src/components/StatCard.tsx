import { NavLink } from "react-router-dom";
import Spinner from "./Spinner";
import type { ReactNode } from "react";

export default function StatCard({
    label,
    value,
    icon,
    accent,
    link,
    loading,
}: {
    label: string;
    value: string;
    icon?: ReactNode;
    accent?: boolean;
    link?: string;
    loading?: boolean;
}) {
    const content = (
        <div className={`rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all hover:shadow-md ${link ? 'cursor-pointer' : ''}`}>
            {loading ? (
                <Spinner size="md" />
            ) : (
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${accent ? 'bg-[#F3E8FF] text-[#7C3AED]' : 'bg-[#F8FAFC] text-[#64748B]'
                            }`}>
                            {icon}
                        </div>
                    </div>
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                            {label}
                        </p>
                        <p className={`mt-1 text-2xl font-bold tracking-tight ${accent ? 'text-[#7C3AED]' : 'text-[#0F172A]'
                            }`}>
                            {value}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );

    if (link) {
        return <NavLink to={link}>{content}</NavLink>;
    }
    return content;
}