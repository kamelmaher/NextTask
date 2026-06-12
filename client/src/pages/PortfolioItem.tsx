import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { getPortfolioItem, deletePortfolioItem } from "../features/portfolio/portfolio.reducer";
import Spinner from "../components/Spinner";

export default function PortfolioItemPage() {
    const { id } = useParams()
    const { item, loading, error, deleteLoading } = useAppSelector(state => state.portfolio)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (id)
            dispatch(getPortfolioItem(id))
    }, [dispatch, id])

    const handleDelete = async () => {
        if (!item?._id) return
        const confirmDelete = window.confirm("Delete this portfolio item? This action cannot be undone.")
        if (!confirmDelete) return

        try {
            await dispatch(deletePortfolioItem(item._id)).unwrap()
            navigate("/profile/portfolio")
        } catch (deleteError) {
            console.error("Delete failed", deleteError)
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-6xl px-6 py-10">
                {
                    loading ? <Spinner /> :
                        error ? <p className="text-sm text-red-500">{error}</p> :
                            item &&
                            <>
                                {/* Hero */}
                                <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                                    <img
                                        src={item?.cover}
                                        alt="Portfolio"
                                        className=" w-full object-cover"
                                    />

                                    <div className="p-8">
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <h1 className="mb-3 text-4xl font-bold text-text-dark">
                                                {item.title}
                                            </h1>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => navigate(`/portfolio/new/${item._id}`)}
                                                    className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-text-dark hover:bg-surface"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={handleDelete}
                                                    className="rounded-full border border-red-400 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                                                >
                                                    {
                                                        deleteLoading ? <Spinner size="sm" /> :
                                                            "Delete"
                                                    }
                                                </button>
                                            </div>
                                        </div>

                                        <p className="max-w-3xl text-lg text-text-dim">
                                            {item.desc}
                                        </p>
                                    </div>
                                </section>

                                {/* Main Content */}
                                <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">

                                    {/* Left Side */}
                                    <div className="space-y-8">

                                        {/* Technologies */}
                                        {
                                            item.skills &&
                                            item.skills.length > 0 &&
                                            <section className="rounded-xl border border-border bg-surface p-6">
                                                <h2 className="mb-4 text-2xl font-bold">
                                                    Technologies Used
                                                </h2>
                                                <div className="flex flex-wrap gap-3">
                                                    {
                                                        item.skills.map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="rounded-full border border-border px-4 py-2 text-sm font-medium"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            </section>
                                        }

                                        {/* Gallery */}
                                        {
                                            item.images &&
                                            item.images.length > 0 &&
                                            <section className="rounded-xl border border-border bg-surface p-6">
                                                <h2 className="mb-4 text-2xl font-bold">
                                                    Project Gallery
                                                </h2>

                                                <div className="grid gap-4 md:grid-cols-2">
                                                    {item.images.map((item) => (
                                                        <img
                                                            key={item}
                                                            src={item}
                                                            alt="portfolio item image"
                                                            className="h-56 w-full rounded-lg object-cover"
                                                        />
                                                    ))}
                                                </div>
                                            </section>
                                        }
                                    </div>

                                    {/* Right Sidebar */}
                                    <aside className="space-y-6">
                                        {/* Project Info */}
                                        <div className="rounded-xl border border-border bg-surface p-6 flex flex-col items-center text-center gap-2">
                                            <h3 className="mb-4 text-lg font-bold">
                                                Freelancer
                                            </h3>
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft font-bold text-brand">
                                                {item.freelancer.firstName.charAt(0).toUpperCase()}{item.freelancer.lastName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold">
                                                    {item.freelancer.firstName} {item.freelancer.lastName}
                                                </p>

                                                <p className="text-sm text-text-dim">
                                                    {item.freelancer.title}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-text-dim">Completed</p>
                                                <p className="font-semibold">
                                                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                                                </p>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </>
                }
            </div>
        </div >
    );
}