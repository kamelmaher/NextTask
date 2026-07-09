import { useState } from "react";
import Spinner from "../../components/Spinner";
import type { Category, createCategoryType, updateCategoryType } from "../../hooks/useCategories";
import { FolderKanban, Plus, Pencil, Trash2, X, Check, AlertCircle } from "lucide-react";
import { useCreateCategory, useDeleteCategory, useLoadCategories, useUpdateCategory } from "../../hooks/useCategories";

export default function DashboardCategoriesPage() {
    const { data, isPending } = useLoadCategories()
    const { mutateAsync: createCategory, error } = useCreateCategory()
    const { mutateAsync: updateCategory, } = useUpdateCategory()
    const { mutateAsync: deleteCategory, } = useDeleteCategory()
    const categories = data?.categories || []
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: "" });
    const [submitError, setSubmitError] = useState("");


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
                const updateData: updateCategoryType = { _id: editingId, title: formData.title };
                await updateCategory(updateData)
            } else {
                const createData: createCategoryType = { title: formData.title };
                await createCategory(createData);
            }
            handleCloseForm();
        } catch {
            setSubmitError("Failed to save category");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteCategory(id);
            } catch (error) {
                console.error("Failed to delete category:", error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="section-title">Categories</h1>
                    <p className="section-subtitle">Manage project categories</p>
                </div>
                <button onClick={() => handleOpenForm()} className="btn-primary">
                    <Plus className="h-4 w-4" />
                    Add Category
                </button>
            </div>

            {error && (
                <div className="rounded-xl bg-[#FEE2E2] border border-[#FECACA] p-4">
                    <p className="text-sm text-[#EF4444] flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {error.message}
                    </p>
                </div>
            )}

            {isPending ? (
                <div className="flex justify-center py-12"><Spinner size="lg" /></div>
            ) : categories.length === 0 && !error ? (
                <div className="rounded-2xl border border-[#E2E8F0] bg-white p-12 text-center shadow-sm">
                    <FolderKanban className="h-12 w-12 text-[#94A3B8] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">No categories yet</h3>
                    <button onClick={() => handleOpenForm()} className="btn-primary mt-4">Create First Category</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <div key={category._id} className="group rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm transition-all hover:border-[#A78BFA] hover:shadow-[0_0_0_1px_rgba(124,58,237,0.1),0_4px_20px_rgba(124,58,237,0.08)]">
                            <div className="flex items-start justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3E8FF]">
                                    <FolderKanban className="h-6 w-6 text-[#7C3AED]" />
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleOpenForm(category)} className="rounded-lg p-2 text-[#64748B] hover:bg-[#F3E8FF] hover:text-[#7C3AED] transition-colors">
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(category._id)} className="rounded-lg p-2 text-[#64748B] hover:bg-[#FEE2E2] hover:text-[#EF4444] transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">{category.title}</h3>
                            <p className="mt-1 text-xs text-[#94A3B8] uppercase tracking-wider font-semibold">Category</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="modal-overlay" onClick={handleCloseForm} />
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-[#E2E8F0]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-[#0F172A]">
                                {editingId ? "Edit Category" : "Add New Category"}
                            </h2>
                            <button onClick={handleCloseForm} className="rounded-lg p-2 text-[#64748B] hover:bg-[#F8FAFC]">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {submitError && (
                            <div className="mb-4 rounded-xl bg-[#FEE2E2] border border-[#FECACA] p-3">
                                <p className="text-sm text-[#EF4444] flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    {submitError}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#0F172A] mb-2">Category Name *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter category name"
                                    className="form-input"
                                    autoFocus
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={handleCloseForm} className="btn-ghost flex-1">Cancel</button>
                                <button type="submit" className="btn-primary flex-1">
                                    <Check className="h-4 w-4" />
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