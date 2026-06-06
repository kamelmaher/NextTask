import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState, type FormEvent } from "react";
import { getCategories } from "../features/category/category.reducer";
import Spinner from "../components/Spinner";
import { createProject } from "../features/projects/projects.reducers";

export default function NewProjectPage() {
    const { categories, loading } = useAppSelector((state) => state.category)
    const { createLoading, createErr } = useAppSelector(state => state.projects)
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        category: "",
        minPrice: 0,
        maxPrice: 0,
        deliveryDuration: 0,
    })
    const [errors, setErrors] = useState({
        title: "",
        desc: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        deliveryDuration: ""
    })
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const formErrors = formHandler()
        if (Object.values(formErrors).filter(e => e != "").length > 0) {
            setErrors(formErrors)
            return
        }
        await dispatch(createProject(formData))
        setFormData({
            title: "",
            desc: "",
            minPrice: 0,
            maxPrice: 0,
            deliveryDuration: 0,
            category: ""
        })
        setErrors({
            title: "",
            desc: "",
            minPrice: "",
            maxPrice: "",
            deliveryDuration: "",
            category: ""
        })
    }
    const formHandler = () => {
        const formErrors = {
            title: "",
            desc: "",
            category: "",
            minPrice: "",
            maxPrice: "",
            deliveryDuration: ""
        }
        if (!formData.title.trim())
            formErrors.title = "title is required"
        if (!formData.desc.trim())
            formErrors.desc = "Description is required"
        if (!formData.category)
            formErrors.category = "category is required"
        if (!formData.minPrice)
            formErrors.minPrice = "min price is required"
        if (formData.minPrice < 50)
            formErrors.minPrice = "min price should be more than 50$"
        if (!formData.maxPrice)
            formErrors.maxPrice = "max price is required"
        if (formData.minPrice > formData.maxPrice)
            formErrors.maxPrice = "max price should be greater than min price"
        if (!formData.deliveryDuration)
            formErrors.deliveryDuration = "delivery duration is required"
        if (formData.deliveryDuration < 0)
            formErrors.deliveryDuration = "delivery durations must one day or more."
        return formErrors
    }
    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

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
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-2xl border border-border bg-surface p-8"
                >
                    <Field label="Project title" required>
                        <input
                            type="text"
                            placeholder="e.g. Build a real-time analytics dashboard"
                            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition-all placeholder:text-text-dim/60 focus:border-brand focus:ring-2 focus:ring-brand/20"
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        />
                    </Field>
                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    <Field label="Description" required>
                        <textarea
                            rows={6}
                            placeholder="Describe what you need, the deliverables, and any constraints."
                            className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-2.5 text-sm leading-relaxed outline-none transition-all placeholder:text-text-dim/60 focus:border-brand focus:ring-2 focus:ring-brand/20"
                            value={formData.desc}
                            onChange={(e) => setFormData((prev) => ({ ...prev, desc: e.target.value }))}
                        />
                        <p className="mt-1.5 text-xs text-text-dim">
                            Minimum 80 characters. Be specific to attract the right talent.
                        </p>
                    </Field>
                    {errors.desc && <p className="text-sm text-red-500">{errors.desc}</p>}
                    <Field label="Category" required>
                        {

                            loading ? <Spinner size="sm" /> :
                                <select
                                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
                                    value={formData.category}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {
                                        categories.map((c) => (
                                            <option key={c._id} value={c._id}>
                                                {c.title}
                                            </option>
                                        ))
                                    }
                                </select>
                        }
                    </Field>
                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                    <Field label="Duration" required>
                        <input
                            type="number"
                            placeholder="e.g. 30"
                            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition-all placeholder:text-text-dim/60 focus:border-brand focus:ring-2 focus:ring-brand/20"
                            value={formData.deliveryDuration}
                            onChange={(e) => setFormData((prev) => ({ ...prev, deliveryDuration: Number(e.target.value) }))}
                        />
                    </Field>
                    {errors.deliveryDuration && <p className="text-sm text-red-500">{errors.deliveryDuration}</p>}
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
                                    value={formData.minPrice}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, minPrice: Number(e.target.value) }))}
                                />
                                {errors.minPrice && <p className="text-sm text-red-500">{errors.minPrice}</p>}

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
                                    value={formData.maxPrice}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                                />
                                {errors.maxPrice && <p className="text-sm text-red-500">{errors.maxPrice}</p>}
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
                            {
                                createLoading ? <Spinner size="sm" /> : "Publish project"
                            }
                        </button>
                    </div>
                    {createErr && <p className="text-sm text-red-500">{createErr}</p>}
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
