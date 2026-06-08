import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { createPortfolioItem, getPortfolioItem, updatePortfolioItem } from "../features/portfolio/portfolio.reducer";
import Spinner from "../components/Spinner";

export default function PortfolioNewPage() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { item, loading, createLoading, updateLoading, error, createError, updateError } = useAppSelector(state => state.portfolio);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);
    const [skills, setSkills] = useState("");

    useEffect(() => {
        if (isEdit && id) {
            dispatch(getPortfolioItem(id));
        }
    }, [dispatch, id, isEdit]);

    useEffect(() => {
        if (isEdit && item) {
            const timer = window.setTimeout(() => {
                setTitle(item.title || "");
                setDesc(item.desc || "");
                setCoverPreview(item.cover || "");
                setImagesPreview(item.images || []);
                setSkills(item.skills?.join(", ") || "");
            })
            return () => window.clearTimeout(timer)
        }
    }, [item, isEdit]);

    const saving = createLoading || updateLoading;
    const message = createError || updateError || error;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("skills", JSON.stringify(skills.split(",").map(i => i.trim()).filter(Boolean)));

        if (coverFile) {
            formData.append("cover", coverFile);
        }

        imageFiles.forEach((file) => {
            formData.append("images", file);
        });

        const action = isEdit && id
            ? await dispatch(updatePortfolioItem({ id, data: formData }))
            : await dispatch(createPortfolioItem(formData));

        if (action.meta.requestStatus === "fulfilled") {
            navigate("/profile/portfolio");
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-4xl px-6 py-10">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-text-dark">
                            {isEdit ? "Edit Portfolio Item" : "Add Portfolio Item"}
                        </h1>
                        <p className="text-sm text-text-dim">
                            {isEdit ? "Update an existing portfolio entry." : "Create a new portfolio entry for your profile."}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-dark hover:bg-surface/90"
                        onClick={() => navigate("/profile/portfolio")}
                    >
                        Back to Portfolio
                    </button>
                </div>

                <div className="overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-sm">
                    {(loading && isEdit) ? (
                        <div className="py-20"><Spinner /></div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-text-dark">Title</label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-text-dark outline-none transition focus:border-brand"
                                    placeholder="Project title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-dark">Description</label>
                                <textarea
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="mt-2 min-h-[140px] w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-text-dark outline-none transition focus:border-brand"
                                    placeholder="Short project description"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-dark">Cover image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] ?? null;
                                        if (file) {
                                            setCoverFile(file);
                                            setCoverPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                    className="mt-2 block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-text-dark outline-none transition focus:border-brand"
                                    required={!isEdit}
                                />
                                {coverPreview && (
                                    <img
                                        src={coverPreview}
                                        alt="Cover preview"
                                        className="mt-4 h-52 w-full rounded-2xl object-cover"
                                    />
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-dark">Project images</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        const files = e.target.files ? Array.from(e.target.files) : [];
                                        setImageFiles(files);
                                        setImagesPreview(files.map((file) => URL.createObjectURL(file)));
                                    }}
                                    className="mt-2 block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-text-dark outline-none transition focus:border-brand"
                                />
                                {imagesPreview.length > 0 && (
                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        {imagesPreview.map((src, index) => (
                                            <img
                                                key={`${src}-${index}`}
                                                src={src}
                                                alt={`Project preview ${index + 1}`}
                                                className="h-36 w-full rounded-2xl object-cover"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-dark">Skills (comma separated)</label>
                                <input
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-text-dark outline-none transition focus:border-brand"
                                    placeholder="React, TypeScript, Figma"
                                />
                            </div>

                            {message && (
                                <p className="text-sm text-red-500">{message}</p>
                            )}

                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center justify-center rounded-2xl bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:bg-brand/60"
                            >
                                {saving ? "Saving..." : isEdit ? "Update Item" : "Add Item"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
