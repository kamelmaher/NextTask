const ProjectsPage = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Filters Sidebar Module */}
                <aside className="w-full lg:w-64 shrink-0 rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-fit">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b pb-3 mb-4">Filters</h3>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Key Words</label>
                            <input type="text" className="mt-1.5 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</label>
                            <div className="mt-1.5 flex gap-2">
                                <input type="number" placeholder="min price" className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none" />
                                <input type="number" placeholder="max price" className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                            <select className="mt-1.5 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none bg-white">
                                <option>All</option>
                            </select>
                        </div>
                    </div>
                </aside>

                {/* Dynamic Project Streams */}
                <main className="flex-1 space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                        <h2 className="text-xl font-bold text-gray-900">Available</h2>
                        <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">10 Found</span>
                    </div>
                    Projects
                    {/* {projects.map(project => (
                        <div key={project.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-blue-300 hover:shadow-sm transition-all group">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-blue-600 group-hover:underline cursor-pointer">{project.title}</h3>
                                    <p className="text-xs text-gray-400 font-medium mt-1">User #{project.userId} • {project.createdAt}</p>
                                </div>
                                <span className="text-lg font-black text-gray-900 shrink-0">${project.minPrice} - ${project.maxPrice}</span>
                            </div>
                            <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">{project.description}</p>
                        </div>
                    ))} */}

                    {/* Simple Dynamic Interface Control Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Prev</button>
                        <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Next</button>
                    </div>
                </main>

            </div>
        </div>
    );
}

export default ProjectsPage
