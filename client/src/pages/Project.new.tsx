import { NavLink } from "react-router-dom";

const categories = [
    "Development",
    "Design",
    "Artificial Intelligence",
    "Marketing",
    "Writing",
    "Mobile",
];

export default function NewProjectPage() {
    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto max-w-3xl px-6 py-10">
                <NavLink to="/" className="mb-6 inline-block text-sm font-medium text-text-dim hover:text-brand">
                    ← Back to projects
                </NavLink>

                <header className="mb-8">
                    <h1 className="font-display text-3xl font-bold tracking-tight text-text-dark">
                        Post a new project
                    </h1>
                    <p className="mt-2 text-sm text-text-dim">
                        Share the scope and budget. Talent will start applying within hours.
                    </p>
                </header>

                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-6 rounded-2xl border border-border bg-surface p-8"
                >
                    <Field label="Project title" required>
                        <input
                            type="text"
                            placeholder="e.g. Build a real-time analytics dashboard"
                            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition-all placeholder:text-text-dim/60 focus:border-brand focus:ring-2 focus:ring-brand/20"
                        />
                    </Field>

                    <Field label="Description" required>
                        <textarea
                            rows={6}
                            placeholder="Describe what you need, the deliverables, and any constraints."
                            className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-2.5 text-sm leading-relaxed outline-none transition-all placeholder:text-text-dim/60 focus:border-brand focus:ring-2 focus:ring-brand/20"
                        />
                        <p className="mt-1.5 text-xs text-text-dim">
                            Minimum 80 characters. Be specific to attract the right talent.
                        </p>
                    </Field>

                    <Field label="Category" required>
                        <select
                            defaultValue=""
                            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <div>
                        <p className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-dim">
                            Budget range <span className="text-destructive">*</span>
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-dim">
                                    $
                                </span>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="Min"
                                    className="w-full rounded-xl border border-border bg-surface py-2.5 pl-7 pr-4 text-sm outline-none transition-all placeholder:text-text-dim/60 focus:border-brand focus:ring-2 focus:ring-brand/20"
                                />
                            </div>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-dim">
                                    $
                                </span>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="Max"
                                    className="w-full rounded-xl border border-border bg-surface py-2.5 pl-7 pr-4 text-sm outline-none transition-all placeholder:text-text-dim/60 focus:border-brand focus:ring-2 focus:ring-brand/20"
                                />
                            </div>
                        </div>
                        <p className="mt-1.5 text-xs text-text-dim">
                            Set a realistic range. You can refine it once proposals come in.
                        </p>
                    </div>

                    <div className="flex flex-col-reverse items-stretch justify-end gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
                        <NavLink
                            to="/"
                            className="rounded-xl border border-border bg-surface px-5 py-2.5 text-center text-sm font-semibold text-text-dark hover:bg-background"
                        >
                            Cancel
                        </NavLink>
                        <button
                            type="submit"
                            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-transform hover:bg-brand/90 active:scale-[0.99]"
                        >
                            Publish project
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-dim">
                {label} {required && <span className="text-destructive">*</span>}
            </span>
            {children}
        </label>
    );
}
