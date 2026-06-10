import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { submitWork } from "../features/contract/contract.reducer";
import Spinner from "./Spinner";

type ContractSubmissionFormProps = {
    contractId: string;
};

const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
};

const ContractSubmissionForm = ({ contractId }: ContractSubmissionFormProps) => {
    const dispatch = useAppDispatch();
    const { submitLoading, submitErr } = useAppSelector((state) => state.contract);
    const [message, setMessage] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState("");

    const previews = useMemo(
        () => files.map((file) => ({
            file,
            url: URL.createObjectURL(file)
        })),
        [files]
    );

    useEffect(() => {
        return () => {
            previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        };
    }, [previews]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (!fileList) return;

        setFiles((prevFiles) => {
            const newFiles = Array.from(fileList);
            const uniqueFiles = [...prevFiles];

            newFiles.forEach((file) => {
                if (!uniqueFiles.some((existingFile) => existingFile.name === file.name && existingFile.size === file.size)) {
                    uniqueFiles.push(file);
                }
            });

            return uniqueFiles;
        });
        setError("");
    };

    const removeFile = (fileToRemove: File) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!files.length) {
            setError("Please select at least one file to submit.");
            return;
        }
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        formData.append("message", message)
        formData.append("_id", contractId)
        await dispatch(submitWork(formData));
        setMessage("");
        setFiles([]);
    };

    return (
        <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-lg font-bold text-text-dark">Submit Work</h2>
            <p className="mt-2 text-sm text-text-dim">Upload multiple files and preview them before sending.</p>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-text-dark mb-2">Attach files</label>
                    <input
                        type="file"
                        multiple
                        className="w-full text-sm text-text-dim file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue-700"
                        onChange={handleFileChange}
                    />
                </div>

                {files.length > 0 && (
                    <div className="space-y-3 rounded-xl border border-border bg-white p-4">
                        {previews.map(({ file, url }) => (
                            <div key={`${file.name}-${file.size}`} className="flex items-center gap-3 rounded-lg border border-border p-3">
                                {file.type.startsWith("image/") ? (
                                    <img src={url} alt={file.name} className="h-16 w-16 rounded-md object-cover" />
                                ) : (
                                    <div className="flex h-16 w-16 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-700">
                                        {file.name.split('.').pop()?.toUpperCase() || "FILE"}
                                    </div>
                                )}

                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-medium text-text-dark">{file.name}</p>
                                    <p className="text-sm text-text-dim">{formatFileSize(file.size)}</p>
                                </div>

                                <button
                                    type="button"
                                    className="rounded-md border border-border bg-muted px-3 py-2 text-sm hover:bg-slate-100"
                                    onClick={() => removeFile(file)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-text-dark mb-2">Message</label>
                    <textarea
                        className="w-full min-h-[120px] rounded-md border border-border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a short note for your submission..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                {(error || submitErr) && (
                    <p className="text-sm text-red-500">{error || submitErr}</p>
                )}

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    disabled={submitLoading}
                >
                    {submitLoading ? <Spinner size="sm" /> : "Submit Files"}
                </button>
            </form>
        </div>
    );
};

export default ContractSubmissionForm;
