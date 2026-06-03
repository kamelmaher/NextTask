import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import Spinner from "../components/Spinner";
import { acceptWork, getContract } from "../features/contract/contract.reducer";
import { contractStatus } from "../utils/status";

export default function ContractPage() {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const { contract, loading, err, acceptWorkLoading, acceptWorkErr } = useAppSelector(
        (state) => state.contract
    );

    const handleCompleteProject = async (id: string) => {
        await dispatch(acceptWork(id))
    }

    useEffect(() => {
        if (id) dispatch(getContract(id));
    }, [id, dispatch]);

    if (loading || !contract)
        return <Spinner size="lg" />;

    const { project, freelancer, employer } = contract
    if (!project || !freelancer || !employer) {
        return <p>Invalid contract data.</p>;
    }
    if (err) return <h1>{err}</h1>
    return (
        <div className="min-h-screen bg-background px-4 py-8 lg:px-10">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">

                {/* LEFT - Project Info */}
                <div className="space-y-6 lg:col-span-2">

                    {/* Project Card */}
                    <div className="rounded-2xl border border-border bg-surface p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-text-dark">
                                    {project.title}
                                </h1>

                                <p className="mt-2 text-sm text-text-dim line-clamp-3">
                                    {project.desc}
                                </p>
                            </div>

                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600">
                                {project.status}
                            </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm text-text-dim">
                            <span>
                                Budget: ${project.minPrice} - ${project.maxPrice}
                            </span>
                            <span>
                                Delivery: {project.deliveryDuration} days
                            </span>
                        </div>
                    </div>

                    {/* Submission Files */}
                    {/* <div className="rounded-2xl border border-border bg-surface p-6">
                        <h2 className="text-lg font-bold text-text-dark">
                            Submission Files
                        </h2>

                        {project.submissions?.length ? (
                            <div className="mt-4 space-y-3">
                                {project.submissions.map((file: File) => (
                                    <div
                                        key={file._id}
                                        className="flex items-center justify-between rounded-lg border border-border p-3"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-text-dark">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-text-dim">
                                                Uploaded by {file.uploadedBy?.firstName}
                                            </p>
                                        </div>

                                        <a
                                            href={file.url}
                                            target="_blank"
                                            className="text-sm font-medium text-blue-500 hover:underline"
                                        >
                                            View
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-4 text-sm text-text-dim">
                                No submissions yet.
                            </p>
                        )}
                    </div> */}
                </div>

                {/* RIGHT - Freelancer Card */}
                <div className="space-y-6">

                    <div className="rounded-2xl border border-border bg-surface p-6">
                        <h2 className="text-sm font-bold uppercase text-text-dim">
                            Freelancer
                        </h2>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand font-bold">
                                {freelancer?.firstName?.charAt(0)}
                            </div>

                            <div>
                                <p className="font-semibold text-text-dark">
                                    {freelancer?.firstName}{" "}
                                    {freelancer?.lastName}
                                </p>
                                <p className="text-sm text-text-dim">
                                    {freelancer?.title}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2 text-sm text-text-dim">
                            <div className="flex items-center justify-between">
                                <p>started At:</p>
                                <p>{new Date(contract.createdAt).toLocaleDateString("en-GB")}</p>
                            </div>
                            <div className="flex justify-between">
                                <span>Contract Status</span>
                                <span className="font-medium text-green-600">
                                    {contract.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    {
                        contract.status !== contractStatus.FINISHED
                        && contract.status !== contractStatus.DECLINED &&
                        <div className="rounded-2xl border border-border bg-surface p-6">
                            <h2 className="text-sm font-bold uppercase text-text-dim">
                                Actions
                            </h2>

                            <div className="mt-4 space-y-2">
                                <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                    Message Freelancer
                                </button>

                                <button className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
                                    Request Update
                                </button>
                                {acceptWorkErr && <p className="text-sm text-red-500">{acceptWorkErr}</p>}
                                <button
                                    className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                                    onClick={() => handleCompleteProject(contract._id)}
                                >
                                    {acceptWorkLoading ? <Spinner size="sm" /> :
                                        "Mark as Completed"}
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
}