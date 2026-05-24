const ProfilePage = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                {/* Profile Sidebar */}
                <div className="space-y-6 lg:col-span-1">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                        <img className="mx-auto h-24 w-24 rounded-full object-cover border border-gray-100 shadow-sm" src={'/placeholder.png'} alt="" />
                        <h2 className="mt-4 text-xl font-bold text-gray-900">Kamel Maher</h2>
                        <p className="text-sm text-gray-400 font-medium" dir="ltr">@kamel_maher</p>
                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">test about</p>

                        <div className="mt-6 flex justify-center gap-1.5 flex-wrap">
                            Skills
                            {/* {user.skills?.map(skill => (
                                <span key={skill} className="rounded-md bg-gray-50 border border-gray-200/60 px-2 py-0.5 text-xs font-medium text-gray-600">{skill}</span>
                            ))} */}
                        </div>
                    </div>

                    {/* Core Performance Tracking Metrics */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 text-sm border-b pb-3 mb-4">Statics</h3>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="rounded-xl bg-gray-50 p-3">
                                <p className="text-2xl font-extrabold text-blue-600">2</p>
                                <p className="text-xs font-medium text-gray-400 mt-0.5">Jobs</p>
                            </div>
                            <div className="rounded-xl bg-gray-50 p-3">
                                <p className="text-2xl font-extrabold text-green-600">$20</p>
                                <p className="text-xs font-medium text-gray-400 mt-0.5">Earned</p>
                            </div>
                            <div className="rounded-xl bg-yellow-50/40 border border-yellow-100 p-3 col-span-2">
                                <p className="text-xl font-black text-yellow-600">★ 4</p>
                                <p className="text-xs font-semibold text-yellow-700/80 mt-0.5">Rating</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Portfolio & Feedback Timelines */}
                <div className="space-y-8 lg:col-span-2">
                    <div>
                        <h3 className="mb-4 text-xl font-bold text-gray-900 tracking-tight">Portfolio</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            Portfolio Items
                            {/* {portfolios.map(item => (
                                <div key={item.id} className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:border-blue-200 transition-colors">
                                    <div className="overflow-hidden aspect-video bg-gray-50 border-b">
                                        <img src={item.thumbnail || '/placeholder.png'} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4"><h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{item.title}</h4></div>
                                </div>
                            ))} */}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xl font-bold text-gray-900 tracking-tight">Review</h3>
                        <div className="space-y-4">
                            Portflio review
                            {/* {reviews.map(review => (
                                <div key={review.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-center justify-between border-b border-gray-50 pb-2 mb-3">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ID: #{review.projectId}</span>
                                        <span className="text-yellow-500 font-bold tracking-tight">{'★'.repeat(review.rating)}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfilePage
