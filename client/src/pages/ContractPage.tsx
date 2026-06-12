import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import Spinner from "../components/Spinner";
import { acceptWork, getContract } from "../features/contract/contract.reducer";
import { contractStatus } from "../utils/status";
import { ProjectCard } from "../components/ProjectCard";
import ContractSubmissionForm from "../components/ContractSubmissionForm";

export default function ContractPage() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth)
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
    const { project, freelancer } = contract
    if (!project || !freelancer) {
        return <p>Invalid contract data.</p>;
    }
    if (err) return <h1>{err}</h1>
    return (
        <div className="min-h-screen bg-background px-4 py-8 lg:px-10">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">

                {/* LEFT - Project Info */}
                <div className="space-y-6 lg:col-span-2">

                    {/* Project Card */}
                    {
                        project &&
                        <ProjectCard project={project} />
                    }

                    {/* Submission Form */}
                    {user && user._id === freelancer._id && contract.status === contractStatus.INPROGRESS && (
                        <ContractSubmissionForm contractId={contract._id} />
                    )}
                    {/* Submissions */}
                    <div className="space-y-6">
                        {
                            contract.submissions.map((submission) => (
                                <div
                                    key={submission.submittedAt}
                                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                >

                                    <div className="mb-4 flex items-center justify-between">

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Submission
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {
                                                    new Date(submission.submittedAt)
                                                        .toLocaleDateString("en-GB")
                                                }
                                            </p>
                                        </div>

                                    </div>

                                    {
                                        submission.message && (
                                            <p className="mb-5 text-gray-700">
                                                {submission.message}
                                            </p>
                                        )
                                    }

                                    <div className="space-y-3">

                                        {
                                            submission.files.map((file, index) => (

                                                <a
                                                    key={index}
                                                    href={`http://localhost:3000${file.path}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="
                                    flex items-center justify-between
                                    rounded-xl border border-gray-200
                                    bg-gray-50 px-4 py-3
                                    transition hover:border-blue-400
                                    hover:bg-blue-50
                                "
                                                >

                                                    <div className="flex items-center gap-3">

                                                        <div
                                                            className="
                                            flex h-11 w-11 items-center
                                            justify-center rounded-lg
                                            bg-blue-100 text-blue-600
                                        "
                                                        >
                                                            📄
                                                        </div>

                                                        <div>

                                                            <p className="font-medium text-gray-800">
                                                                {file.originalName}
                                                            </p>

                                                        </div>

                                                    </div>

                                                    <span
                                                        className="
                                        rounded-lg bg-blue-600
                                        px-3 py-1.5 text-sm
                                        font-medium text-white
                                    "
                                                    >
                                                        Open
                                                    </span>

                                                </a>
                                            ))
                                        }

                                    </div>

                                </div>
                            ))
                        }
                    </div>
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
                                <span>Finished At</span>
                                <span className="">
                                    {new Date(contract.updatedAt).toLocaleDateString("en-GB")}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Contract Status</span>
                                <span className="font-medium text-green-600">
                                    {contract.status}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Agreed Price</span>
                                <span className="">
                                    ${contract.agreedPrice}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    {
                        user &&
                        project.employer?._id == user?._id &&
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