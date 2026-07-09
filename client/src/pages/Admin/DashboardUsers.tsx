import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deleteUser, getAllUsers, toggleRole } from "../../features/auth/auth.reducer";
import { ConfirmModal } from "../../components/ConfirmModal";
import { roles } from "../../utils";
import { DashHeader, DataTable, StatGrid } from "../../components/DashboardUi";
import { Search } from "lucide-react";
import Spinner from "../../components/Spinner";
import { useLoadDashboardStatics } from "../../hooks/useStatics";

export default function DashboardUsersPage() {
    const dispatch = useAppDispatch();
    const { users, loading, deleteLoading, deleteErr, updateProfileErr, updateProfileLoading } = useAppSelector((state) => state.auth);
    useEffect(() => {
        dispatch(getAllUsers("user"))
    }, [dispatch]);

    const { data: dashboardStatics, isPending: staticsLoading } = useLoadDashboardStatics()

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
        <div>
            <DashHeader
                title="Users"
                subtitle="Manage clients and freelancers on the platform."
            />
            {
                staticsLoading ? <Spinner size="md" /> :
                    <StatGrid stats={[
                        { label: "Total users", value: `${dashboardStatics?.totalUsers}` },
                    ]} />
            }

            <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
                <Search className="h-4 w-4 text-text-dim" />
                <input className="w-full bg-transparent text-sm outline-none placeholder:text-text-dim" placeholder="Search users by name or email..." />
            </div>
            {
                loading ? <Spinner size="md" /> :
                    <DataTable headers={["User", "Title", "Joined", "Roles", "Assign Role", "Delete"]}>
                        {
                            users.map((u) => (
                                <tr key={u._id} className="hover:bg-muted/30">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary-dark">
                                                {u.firstName.split(" ").map((p) => p[0]).join("")}
                                            </div>
                                            <div>
                                                <p className="font-medium text-text-dark">{u.firstName} {u.lastName}</p>
                                                <p className="text-xs text-text-muted">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-text-body">{u.title}</td>
                                    <td className="px-5 py-4 text-text-muted">{new Date(u.createdAt).toLocaleDateString("en-GB")}</td>
                                    <td>
                                        <div className="flex gap-1">
                                            {u.roles.map(role => (
                                                <div className="relative" key={role}>
                                                    <span
                                                        className="bg-red-500 text-white w-[20px]
                                                        h-[20px] right-[-5px] top-[-5px] absolute rounded-full text-center cursor-pointer"
                                                        onClick={() => openToggleRoleConfirm(u._id, role)}
                                                    >x</span>
                                                    <button className="bg-gray-500 p-2 text-white rounded-3xl">{role}</button>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <select
                                            onChange={(e) => {
                                                openToggleRoleConfirm(u._id, e.target.value)
                                            }}
                                        >
                                            <option value="">Select Role</option>
                                            {
                                                availableRolesForUser(u._id).map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            className="p-2 bg-red-500 rounded text-white"
                                            onClick={() => openDeleteConfirm(u._id, `${u.firstName} ${u.lastName}`)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))}
                    </DataTable>
            }

            <ConfirmModal
                isOpen={deleteConfirm}
                onClose={onDeleteClose}
                onConfirm={handleDeleteConfirm}
                loading={deleteLoading}
                action="Delete User"
                err={deleteErr}
                selectedUser={{ name: selectedUser?.name }}
            />
            <ConfirmModal
                isOpen={toggleRoleConfirm}
                onClose={onToggleRoleClose}
                onConfirm={handleToggleRoleConfirm}
                loading={updateProfileLoading}
                action="Toggle Role"
                err={updateProfileErr}
                selectedUser={{ role: selectedUser?.role }}
            />
        </div>
    );
}
