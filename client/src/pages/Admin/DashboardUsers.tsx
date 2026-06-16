import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Spinner from "../../components/Spinner";
import { deleteUser, getAllUsers, toggleRole } from "../../features/auth/auth.reducer";
import { ConfirmModal } from "../../components/ConfirmModal";
import { roles } from "../../utils";
import { DashHeader, DataTable, StatGrid } from "../../components/DashboardUi";
import { UserPlus, Search, Badge } from "lucide-react";

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
        <div>
            <DashHeader
                title="Users"
                subtitle="Manage clients and freelancers on the platform."
                // action={
                //     <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand hover:bg-primary-dark">
                //         <UserPlus className="h-4 w-4" /> Invite user
                //     </button>
                // }
            />
            <StatGrid stats={[
                { label: "Total users", value: "12,486", delta: "+128 this week" },
                // { label: "Freelancers", value: "8,210", delta: "+96 this week" },
                // { label: "Clients", value: "4,276", delta: "+32 this week" },
                // { label: "Suspended", value: "47" },
            ]} />

            <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
                <Search className="h-4 w-4 text-text-dim" />
                <input className="w-full bg-transparent text-sm outline-none placeholder:text-text-dim" placeholder="Search users by name or email..." />
            </div>

            <DataTable headers={["User", "Title", "Joined"]}>
                {users.map((u) => (
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
                        {/* <td className="px-5 py-4 font-mono text-text-dark">{u.projects}</td> */}
                        <td className="px-5 py-4 text-text-muted">{new Date(u.createdAt).toLocaleDateString("en-GB")}</td>
                    </tr>
                ))}
            </DataTable>
        </div>
    );
}
