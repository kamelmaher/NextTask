import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../features/category/category.reducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import type { Category, createCategoryType, updateCategoryType } from "../../features/category/category.types";

export default function DashboardCategoriesPage() {
    const dispatch = useAppDispatch();
    const { categories, loading, err } = useAppSelector((state) => state.category);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: "" });
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleOpenForm = (category?: Category) => {
        if (category) {
            setFormData({ title: category.title });
            setEditingId(category._id);
        } else {
            setFormData({ title: "" });
            setEditingId(null);
        }
        setSubmitError("");
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setFormData({ title: "" });
        setEditingId(null);
        setSubmitError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError("");

        if (!formData.title.trim()) {
            setSubmitError("Category title is required");
            return;
        }

        try {
            if (editingId) {
                const updateData: updateCategoryType = {
                    id: editingId,
                    title: formData.title,
                };
                await dispatch(updateCategory(updateData));
            } else {
                const createData: createCategoryType = {
                    title: formData.title,
                };
                await dispatch(createCategory(createData));
            }
            handleCloseForm();
        } catch (error) {
            setSubmitError("Failed to save category");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this category?")) {
            try {
                await dispatch(deleteCategory(id));
            } catch (error) {
                console.error("Failed to delete category:", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-text-dark">Categories Management</h1>
                        <p className="text-text-dim">Add, edit, and delete project categories.</p>
                    </div>
                    <button
                        onClick={() => handleOpenForm()}
                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition"
                    >
                        + Add Category
                    </button>
                </div>

                {err && (
                    <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600 border border-red-200">
                        {err}
                    </div>
                )}

                {loading && <Spinner label="Loading categories..." />}

                {!loading && categories.length === 0 && !err && (
                    <div className="rounded-lg border border-border bg-surface p-8 text-center">
                        <p className="text-text-dim mb-4">No categories found.</p>
                        <button
                            onClick={() => handleOpenForm()}
                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition"
                        >
                            Create First Category
                        </button>
                    </div>
                )}

                {!loading && categories.length > 0 && (
                    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                        <table className="w-full border-collapse text-sm">
                            <thead className="bg-background text-left text-text-dim">
                                <tr>
                                    <th className="px-6 py-4">Category Name</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category._id} className="border-t border-border hover:bg-slate-50 transition">
                                        <td className="px-6 py-4 font-semibold text-text-dark">
                                            {category.title}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleOpenForm(category)}
                                                className="mr-3 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 transition text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category._id)}
                                                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 transition text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
                    <div className="w-full max-w-md rounded-lg bg-surface p-6 shadow-lg border border-border">
                        <h2 className="mb-4 text-xl font-bold text-text-dark">
                            {editingId ? "Edit Category" : "Add New Category"}
                        </h2>

                        {submitError && (
                            <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-600 border border-red-200 text-sm">
                                {submitError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Title Input */}
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-2">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter category name"
                                    className="w-full rounded-lg border border-border bg-background px-4 py-2 text-text-dark placeholder-text-dim focus:border-blue-500 focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Buttons */}
                            <div className="mt-6 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2 font-medium text-text-dark hover:bg-slate-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition"
                                >
                                    {editingId ? "Update" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
