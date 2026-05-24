const ProjectPage = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Project Title</h1>
                        <p className="mt-4 text-sm text-gray-600 leading-relaxed">Project Desc</p>
                    </div>

                    {/* Conditional Offer Application Element */}
                    <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4">Submit</h3>
                        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">Bid</label>
                                    <input type="number" className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">Duration</label>
                                    <input type="number" className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">Pitch</label>
                                <textarea rows={4} className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white p-2 text-sm focus:outline-none" placeholder="placeholder"></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">Files</label>
                                <input type="file" className="mt-1.5 block text-xs text-gray-500 cursor-pointer" />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Action</button>
                        </form>
                    </div>

                    {/* Structural Listing representation */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Receved 10</h3>
                        Proposals
                        {/* {proposals.map(proposal => (
                            <div key={proposal.id} className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm">
                                <div className="flex justify-between items-center text-sm font-bold text-gray-900 border-b border-gray-50 pb-2 mb-2">
                                    <span>${proposal.price}</span>
                                    <span className="text-xs font-normal text-gray-400">{proposal.deliveryDuration} Days</span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{proposal.content}</p>
                            </div>
                        ))} */}
                    </div>
                </div>

                {/* Structural Info Card Sidebar blocks */}
                <div className="space-y-6">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 text-sm border-b pb-3 mb-4">Project Details</h3>
                        <div className="space-y-3.5 text-sm">
                            <div className="flex justify-between"><span className="text-gray-400 font-medium">Status:</span> <span className="font-semibold text-green-600 uppercase tracking-wide text-xs">open</span></div>
                            <div className="flex justify-between"><span className="text-gray-400 font-medium">Price:</span> <span className="font-bold text-gray-900">$100 - $200</span></div>
                            <div className="flex justify-between"><span className="text-gray-400 font-medium">Date:</span> <span className="text-gray-600 font-medium">20/5/2026</span></div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center gap-4">
                        <img className="h-10 w-10 rounded-full object-cover border border-gray-100" src="/placeholder.png" alt="" />
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">Client</h4>
                            <p className="text-xs font-medium text-gray-400">Verified</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProjectPage
