import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { createProposal } from "../features/proposal/proposal.reducer";
import Spinner from "./Spinner";
import type { Project } from "../features/projects/projects.types";

type ProposalFormProps = {
    project: Project
}
const ProposalForm = ({ project }: ProposalFormProps) => {
    const dispatch = useAppDispatch();
    const { addProposalLoading, addProposalErr } = useAppSelector(state => state.proposal)
    const [formData, setFormData] = useState({
        content: "",
        price: 0,
        deliveryDuration: 0,
    })

    const [errors, setErrors] = useState({
        content: "",
        price: "",
        deliveryDuration: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = formHandler()
        if (Object.values(formErrors).filter(e => e != "").length > 0) {
            setErrors(formErrors)
            return
        }
        const newProposal = { ...formData, projectId: project._id }
        await dispatch(createProposal(newProposal))
        setFormData({
            content: "",
            deliveryDuration: 0,
            price: 0
        })
        setErrors({
            content: "",
            price: "",
            deliveryDuration: ""
        })
    }

    const formHandler = () => {
        const formErrors = {
            content: "",
            price: "",
            deliveryDuration: ""
        }
        if (!formData.content.trim())
            formErrors.content = "content is required"
        if (!formData.price)
            formErrors.price = "price is required"
        if (formData.price < project.minPrice || formData.price > project.maxPrice)
            formErrors.price = "price should be between the price range"
        if (!formData.deliveryDuration)
            formErrors.deliveryDuration = "delivery duration is required"
        return formErrors
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
                    {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
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
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                {errors.deliveryDuration && <p className="text-sm text-red-500">{errors.deliveryDuration}</p>}

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