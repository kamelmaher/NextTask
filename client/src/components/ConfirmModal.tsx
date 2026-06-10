import Spinner from "./Spinner"

type ModalProps = {
    isOpen: boolean
    onConfirm: () => Promise<void>,
    onClose: () => void,
    loading: boolean
    err?: string | null
    action: string
    selectedUser?: { role?: string, name?: string }
}
export const ConfirmModal = ({ isOpen, onConfirm, onClose, loading, action, err, selectedUser }: ModalProps) => {
    return (
        isOpen &&
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-2">Confirm {action}</h2>
                <p className="text-sm text-text-dim mb-4">Are you sure you want to {action} {selectedUser?.name ? `- ${selectedUser.name}` : `- ${selectedUser?.role}`}? This action cannot be undone.</p>
                <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose} disabled={loading}>Cancel</button>
                    <button className="px-4 py-2 rounded bg-red-600 text-white" onClick={onConfirm} disabled={loading}>{loading ? <Spinner size="sm" /> : action}</button>
                </div>
                <div>
                    {err && <p className="text-sm text-red-500">{err}</p>}
                </div>
            </div>
        </div>
    )
}
