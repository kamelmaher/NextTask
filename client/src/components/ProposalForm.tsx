import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { createProposal } from "../features/proposal/proposal.reducer";
import Spinner from "./Spinner";

type ProposalFormProps = {
    projectId: string
}
const ProposalForm = ({ projectId }: ProposalFormProps) => {
    const dispatch = useAppDispatch();
    const { addProposalLoading, addProposalErr } = useAppSelector(state => state.proposal)
    const [formData, setFormData] = useState({
        content: "",
        price: 0,
        deliveryDuration: 0,
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newProposal = { ...formData, projectId: projectId }
        await dispatch(createProposal(newProposal))
    }
    return (
        <div className="mt-8 border rounded-xl p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Submit a Proposal</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Cover Letter */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Cover Letter
                    </label>
                    <textarea
                        className="w-full border rounded-md p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your proposal cover letter..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
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
                            value={formData.deliveryDuration}
                            onChange={(e) => setFormData({ ...formData, deliveryDuration: parseInt(e.target.value) })}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                {addProposalErr && <p className="text-red-500 text-sm">{addProposalErr}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {
                        addProposalLoading ? <Spinner size="sm" /> : "Submit Proposal"
                    }
                </button>
            </form>
        </div>
    );
};

export default ProposalForm;