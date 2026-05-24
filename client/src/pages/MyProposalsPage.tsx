const MyProposalsPage = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between mb-6 gap-4 border-b border-gray-100 pb-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Title</h1>
                <div className="flex gap-2 shrink-0">
                    <input type="text" placeholder="Filters" className="rounded-lg border border-gray-300 p-2 text-xs focus:outline-none focus:border-blue-500" />
                    <select className="rounded-lg border border-gray-300 p-2 text-xs focus:outline-none bg-white font-medium text-gray-600">
                        <option>All</option>
                        <option>Pending</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto border border-gray-200 bg-white rounded-xl shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50 font-bold text-gray-500">
                        <tr>
                            <th className="px-6 py-3 text-start tracking-wider uppercase text-xs">Ref</th>
                            <th className="px-6 py-3 text-start tracking-wider uppercase text-xs">Bid Table</th>
                            <th className="px-6 py-3 text-start tracking-wider uppercase text-xs">Duration Table</th>
                            <th className="px-6 py-3 text-start tracking-wider uppercase text-xs">Status Table</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-600 font-medium">
                        Proposals
                        {/* {proposals.map((prop) => (
                            <tr key={prop.id} className="hover:bg-gray-50/60 transition-colors">
                                <td className="px-6 py-4 font-bold text-blue-600">#{prop.projectId}</td>
                                <td className="px-6 py-4">${prop.price}</td>
                                <td className="px-6 py-4">{prop.deliveryDuration} Days</td>
                                <td className="px-6 py-4">
                                    <span className="inline-block rounded-full bg-yellow-50 border border-yellow-100 px-2.5 py-0.5 text-xs font-bold text-yellow-700">{t('proposals.statusPending')}</span>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyProposalsPage
