import type { ReactNode } from "react";

export function DashHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
    return (
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
                <h1 className="text-2xl font-bold text-text-dark">{title}</h1>
                <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
            </div>
            {action}
        </div>
    );
}

export function StatGrid({ stats }: { stats: { label: string; value: string; delta?: string, icon?: ReactNode }[] }) {
    return (
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-surface p-5">
                    <div className="flex gap-2 items-center">
                        <div className="text-primary">
                            {s.icon}
                        </div>
                        <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{s.label}</p>
                    </div>
                    <p className="mt-2 font-mono text-2xl font-bold text-text-dark">{s.value}</p>
                    {s.delta && <p className="mt-1 text-xs font-medium text-success">{s.delta}</p>}
                </div>
            ))}
        </div>
    );
}

export function DataTable({ headers, children }: { headers: string[]; children: ReactNode }) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="border-b border-border bg-muted/40">
                        <tr>
                            {headers.map((h) => (
                                <th key={h} className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-center">{children}</tbody>
                </table>
            </div>
        </div>
    );
}
