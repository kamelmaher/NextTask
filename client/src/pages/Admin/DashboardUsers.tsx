import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Spinner from "../../components/Spinner";
import { deleteUser, getAllUsers, toggleRole } from "../../features/auth/auth.reducer";
import { ConfirmModal } from "../../components/ConfirmModal";
import { roles } from "../../utils";

export default function DashboardUsersPage() {
    const dispatch = useAppDispatch();
    const { users, loading, err, deleteLoading, deleteErr, updateProfileErr, updateProfileLoading } = useAppSelector((state) => state.auth);
    useEffect(() => {
        dispatch(getAllUsers("user"))
    }, [dispatch]);
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [toggleRoleConfirm, setToggleRoleConfirm] = useState(false)
    const [selectedUser, setSelectedUser] = useState<{ id: string; name?: string, role?: string } | null>(null)

    const openDeleteConfirm = (id: string, name: string) => {
        setSelectedUser({ id, name })
        setDeleteConfirm(true)
    }

    const handleDeleteConfirm = async () => {
        if (!selectedUser) return
        await dispatch(deleteUser(selectedUser.id))
        if (!deleteErr) {
            onDeleteClose()
        }
    }

    const onDeleteClose = () => {
        setSelectedUser(null)
        setDeleteConfirm(false)
    }

    const openToggleRoleConfirm = (id: string, role: string) => {
        setSelectedUser({ id, role })
        setToggleRoleConfirm(true)
    }

    const handleToggleRoleConfirm = async () => {
        if (!selectedUser || !selectedUser.role) return
        await dispatch(toggleRole({ userId: selectedUser.id, role: selectedUser.role }))
        onToggleRoleClose()
    }

    const onToggleRoleClose = () => {
        setSelectedUser(null)
        setToggleRoleConfirm(false)
    }

    const availableRolesForUser = (id: string) => {
        const initialRoles = [roles.ADMIN, roles.MANAGER]
        if (!users) return initialRoles
        const user = users.find(user => user._id === id)
        if (!user) return initialRoles
        const userRoles = user.roles || []
        if (!userRoles.length) return initialRoles
        return initialRoles.filter(initial => {
            const foundRole = userRoles.find(role => role === initial)
            if (!foundRole) return initial
        })
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-text-dark">User Listing</h1>
                        <p className="text-text-dim">Browse registered users and their account details.</p>
                    </div>
                </div>
                {updateProfileErr && <p className="text-sm text-red-500">{updateProfileErr}</p>}
                {loading ? (
                    <Spinner label="Loading users..." />
                ) : err ? (
                    <p className="text-red-500">{err}</p>
                ) : users.length === 0 ? (
                    <p className="text-text-dim">No users found.</p>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                        <table className="w-full border-collapse text-sm">
                            <thead className="bg-background text-left text-text-dim">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Assign Role</th>
                                    <th className="px-6 py-4">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-t border-border hover:bg-slate-50">
                                        <td className="px-6 py-4 font-semibold text-text-dark">{user.firstName} {user.lastName}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1">
                                                {user.roles.map(role => (
                                                    <div className="relative" key={role}>
                                                        <span
                                                            className="bg-red-500 text-white w-[20px]
                                                        h-[20px] right-[-5px] top-[-5px] absolute rounded-full text-center cursor-pointer"
                                                            onClick={() => openToggleRoleConfirm(user._id, role)}
                                                        >x</span>
                                                        <button className="bg-gray-500 p-2 text-white rounded-3xl">{role}</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{user.title || "—"}</td>
                                        <td>
                                            <select
                                                onChange={e => openToggleRoleConfirm(user._id, e.target.value)}
                                            >
                                                <option value="">Select Role</option>
                                                {
                                                    availableRolesForUser(user._id).map(role => (
                                                        <option key={role} value={role}>{role}</option>
                                                    ))
                                                }
                                            </select>
                                        </td>
                                        <td className="px-6 py-4"><button
                                            className="bg-red-500 text-white p-2 rounded-xl"
                                            onClick={() => openDeleteConfirm(user._id, `${user.firstName} ${user.lastName}`)}>delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <ConfirmModal isOpen={deleteConfirm} onClose={onDeleteClose} onConfirm={handleDeleteConfirm} action="Delete User" loading={deleteLoading} err={deleteErr} selectedUser={{ name: selectedUser?.name }} />

                <ConfirmModal isOpen={toggleRoleConfirm} onClose={onToggleRoleClose} onConfirm={handleToggleRoleConfirm} action="Toggle Role" loading={updateProfileLoading} selectedUser={{ role: selectedUser?.role }} />
            </div>
        </div>
    );
}
