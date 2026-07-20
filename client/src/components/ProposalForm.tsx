/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Spinner from "./Spinner";
import type { Project } from "../hooks/useProjects";
import { Field } from "./AuthLayout";
import { useCreateProposal } from "../hooks/useProposal";
import { generateProposal } from "../services/proposal";
import { Sparkles } from "lucide-react";

type ProposalFormProps = {
    project: Project
}
const ProposalForm = ({ project }: ProposalFormProps) => {
    const { mutateAsync: createProposal, isPending, error } = useCreateProposal()
    const [isGenerating, setIsGenerating] = useState(false)
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

    const handleGenerateProposal = async () => {
        setIsGenerating(true)
        setErrors(prev => ({ ...prev, content: "" }))
        try {

            const proposal = await generateProposal({ title: project.title, desc: project.desc })
            if (proposal)
                setFormData(prev => ({ ...prev, content: proposal }))
        } catch (err: any) {
            setErrors(prev => ({ ...prev, content: err.response.data.msg || "Something went wrong" }))
        } finally {
            setIsGenerating(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = formHandler()
        if (Object.values(formErrors).filter(e => e != "").length > 0) {
            setErrors(formErrors)
            return
        }
        const newProposal = { ...formData, projectId: project._id }
        await createProposal(newProposal)
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

            <form
                id="submit-proposal"
                onSubmit={handleSubmit}
            >
                <h2 className="font-display text-xl font-semibold text-text-dark">Submit a proposal</h2>
                <p className="mt-1 text-sm text-text-muted">
                    Pitch your approach, timeline, and price. Be specific.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Field
                        label="Your bid (USD)"
                        type="number"
                        min={1}
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: +e.target.value }))}
                        placeholder="1500"
                        className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                    />
                    <Field label="Estimated duration"
                        type="text"
                        value={formData.deliveryDuration}
                        onChange={(e) => setFormData(prev => ({ ...prev, deliveryDuration: +e.target.value }))}
                        placeholder="e.g. 2 weeks"
                        className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label>COVER LETTER</label>
                    <textarea
                        rows={10}
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Why are you a great fit for this project?"
                        className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>
                <div>
                    <button
                        type="button"
                        onClick={handleGenerateProposal}
                        disabled={isGenerating}
                        className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-primary-foreground font-medium text-sm hover:bg-primary-dark transition">
                        {
                            isGenerating ? <Spinner /> :
                                <>
                                    <Sparkles size={18} />
                                    Generate with AI
                                </>
                        }
                    </button>
                </div>
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                {errors.deliveryDuration && <p className="text-sm text-red-500">{errors.deliveryDuration}</p>}
                {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                {error && <p className="text-sm text-red-50">{error.message}</p>}
                <div className="mt-5 flex items-center justify-end gap-3">
                    <button
                        type="submit"
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
                    >
                        {
                            isPending ? <Spinner size="md" /> :
                                "Send proposal"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProposalForm;