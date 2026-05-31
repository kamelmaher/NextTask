const ProposalForm = () => {
    return (
        <div className="mt-8 border rounded-xl p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Submit a Proposal</h2>

            <form className="space-y-4">
                {/* Cover Letter */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Cover Letter
                    </label>
                    <textarea
                        className="w-full border rounded-md p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your proposal cover letter..."
                    />
                </div>

                {/* Price + Delivery Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Proposed Price ($)
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. 500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Delivery Time (days)
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. 7"
                        />
                    </div>
                </div>

                {/* Attachments */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Attach Files (optional)
                    </label>
                    <input
                        type="file"
                        multiple
                        className="w-full border rounded-md p-2"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="button"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Submit Proposal
                </button>
            </form>
        </div>
    );
};

export default ProposalForm;