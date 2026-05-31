export default function PortfolioItemPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-6xl px-6 py-10">

                {/* Hero */}
                <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                    <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                        alt="Portfolio"
                        className="h-[450px] w-full object-cover"
                    />

                    <div className="p-8">
                        <div className="mb-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
                                Web Development
                            </span>

                            <span className="rounded-full border border-border px-3 py-1 text-xs">
                                Completed 2026
                            </span>
                        </div>

                        <h1 className="mb-3 text-4xl font-bold text-text-dark">
                            E-Commerce Platform for Electronics Store
                        </h1>

                        <p className="max-w-3xl text-lg text-text-dim">
                            A modern e-commerce platform with product management,
                            payment integration, advanced search, and an admin dashboard.
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">

                    {/* Left Side */}
                    <div className="space-y-8">

                        {/* Description */}
                        <section className="rounded-xl border border-border bg-surface p-6">
                            <h2 className="mb-4 text-2xl font-bold">
                                Project Overview
                            </h2>

                            <p className="leading-8 text-text-dim">
                                This project was built for a client who needed a
                                complete online store capable of handling thousands
                                of products. The system includes authentication,
                                shopping cart functionality, payment processing,
                                order tracking, and an administrative dashboard.
                            </p>
                        </section>

                        {/* Technologies */}
                        <section className="rounded-xl border border-border bg-surface p-6">
                            <h2 className="mb-4 text-2xl font-bold">
                                Technologies Used
                            </h2>

                            <div className="flex flex-wrap gap-3">
                                {[
                                    "React",
                                    "TypeScript",
                                    "Node.js",
                                    "Express",
                                    "MongoDB",
                                    "TailwindCSS",
                                    "Stripe",
                                ].map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-border px-4 py-2 text-sm font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Gallery */}
                        <section className="rounded-xl border border-border bg-surface p-6">
                            <h2 className="mb-4 text-2xl font-bold">
                                Project Gallery
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <img
                                        key={item}
                                        src={`https://picsum.photos/600/400?random=${item}`}
                                        alt=""
                                        className="h-56 w-full rounded-lg object-cover"
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar */}
                    <aside className="space-y-6">

                        {/* Project Info */}
                        <div className="rounded-xl border border-border bg-surface p-6">
                            <h3 className="mb-4 text-lg font-bold">
                                Project Information
                            </h3>

                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="text-text-dim">Category</p>
                                    <p className="font-semibold">
                                        Web Development
                                    </p>
                                </div>

                                <div>
                                    <p className="text-text-dim">Duration</p>
                                    <p className="font-semibold">
                                        3 Months
                                    </p>
                                </div>

                                <div>
                                    <p className="text-text-dim">Project Type</p>
                                    <p className="font-semibold">
                                        Freelance Contract
                                    </p>
                                </div>

                                <div>
                                    <p className="text-text-dim">Completed</p>
                                    <p className="font-semibold">
                                        March 2026
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Freelancer */}
                        <div className="rounded-xl border border-border bg-surface p-6">
                            <h3 className="mb-4 text-lg font-bold">
                                Freelancer
                            </h3>

                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft font-bold text-brand">
                                    KM
                                </div>

                                <div>
                                    <p className="font-semibold">
                                        Kamel Maher
                                    </p>

                                    <p className="text-sm text-text-dim">
                                        Full Stack Developer
                                    </p>
                                </div>
                            </div>

                            <button className="mt-6 w-full rounded-lg bg-brand py-3 font-semibold text-brand-foreground transition hover:bg-brand/90">
                                Hire Freelancer
                            </button>
                        </div>
                    </aside>
                </div>

                {/* Related Work */}
                <section className="mt-10">
                    <h2 className="mb-6 text-2xl font-bold">
                        More From This Freelancer
                    </h2>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="overflow-hidden rounded-xl border border-border bg-surface"
                            >
                                <img
                                    src={`https://picsum.photos/500/300?random=${item + 10}`}
                                    alt=""
                                    className="h-48 w-full object-cover"
                                />

                                <div className="p-4">
                                    <h3 className="font-semibold">
                                        Portfolio Project #{item}
                                    </h3>

                                    <p className="mt-2 text-sm text-text-dim">
                                        Modern web application built with React.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}