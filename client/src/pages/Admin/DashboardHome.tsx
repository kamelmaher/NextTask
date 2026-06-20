import {
    Briefcase,
    Users,
    FileText,
    Wallet,
    Clock3,
} from "lucide-react";
import { StatGrid } from "../../components/DashboardUi";
import { useAppSelector } from "../../store/store";
import Spinner from "../../components/Spinner";
import { NavLink } from "react-router-dom";

export default function DashboardHome() {
    const { dashboardStatics, loading } = useAppSelector(state => state.statics)
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-heading">
                    Dashboard Overview
                </h1>
                <p className="mt-1 text-sm text-text-body">
                    Monitor platform activity and recent updates.
                </p>
            </div>

            {/* Stats */}
            {
                loading ? <Spinner /> :
                    dashboardStatics &&
                    <>
                        <StatGrid stats={[
                            {
                                label: "Total Users",
                                value: `${dashboardStatics.totalUsers}`,
                                icon: <Users />,
                            },
                            {
                                label: "Projects",
                                value: `${dashboardStatics.projectStatics.totalProjects}`,
                                icon: <Briefcase />,
                            },
                            {
                                label: "Contracts",
                                value: `${dashboardStatics.contractStatics.totalContracts}`,
                                icon: <FileText />,
                            },
                            {
                                label: "Revenue",
                                value: "$24,580",
                                icon: <Wallet />,
                            },
                        ]} />

                        {/* Main Content */}
                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Recent Projects */}
                            <div className="rounded-xl border border-border bg-surface p-5 lg:col-span-2">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-text-heading">
                                        Recent Projects
                                    </h2>

                                    <button className="text-sm font-medium text-primary">
                                        View All
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {dashboardStatics.activity.recentProjects.map((project) => (
                                        <NavLink
                                            to={`/project/${project._id}`}
                                            key={project._id}
                                            className="flex items-center justify-between rounded-lg border border-border p-4"
                                        >
                                            <div>
                                                <h3 className="font-medium text-text-heading">
                                                    {project.title}
                                                </h3>

                                                <p className="mt-1 text-sm text-text-body">
                                                    {project.employer.firstName} {project.employer.lastName}
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                                                {project.status}
                                            </span>
                                        </NavLink>
                                    ))}
                                </div>
                            </div>

                            {/* Pending Actions */}
                            <div className="rounded-xl border border-border bg-surface p-5">
                                <h2 className="mb-4 text-lg font-semibold text-text-heading">
                                    Pending Actions
                                </h2>

                                <div className="space-y-4">
                                    <NavLink
                                        to={"/admin/projects?approve-status=pending"}
                                        className="block rounded-lg bg-muted p-4">
                                        <p className="text-sm text-text-body">
                                            Projects Awaiting Approval
                                        </p>

                                        <h3 className="mt-1 text-xl font-bold">
                                            {dashboardStatics.projectStatics.pendingProjects || 0}
                                        </h3>
                                    </NavLink>

                                    <NavLink
                                        to={"/admin/transactions"}
                                        className="block rounded-lg bg-muted p-4">
                                        <p className="text-sm text-text-body">
                                            Withdrawal Requests
                                        </p>

                                        <h3 className="mt-1 text-xl font-bold">
                                            {dashboardStatics.pendingActions.pendingWithdrawals || 0}
                                        </h3>
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        {/* Recent Payments */}
                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Recent Payments */}
                            <div className="rounded-xl border border-border bg-surface p-5">
                                <h2 className="mb-4 text-lg font-semibold text-text-heading">
                                    Recent Deposits
                                </h2>

                                <div className="space-y-3">
                                    {dashboardStatics.activity.recentDeposits.map((payment) => (
                                        <div
                                            key={payment._id}
                                            className="flex items-center justify-between rounded-lg border border-border p-4"
                                        >
                                            <div>
                                                <h3 className="font-medium text-text-heading">
                                                    {payment.user?.firstName} {payment.user?.lastName}
                                                </h3>
                                            </div>

                                            <span className="font-semibold text-success">
                                                +${payment.amount}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Contract*/}
                            <div className="rounded-xl border border-border bg-surface p-5">
                                <h2 className="mb-4 text-lg font-semibold text-text-heading">
                                    Recent Contracts
                                </h2>

                                <div className="space-y-4">
                                    {dashboardStatics.activity.recentContracts.map((contract) => (
                                        <div
                                            key={contract._id}
                                            className="flex gap-3"
                                        >
                                            <div className="mt-1">
                                                <Clock3 className="h-4 w-4 text-primary" />
                                            </div>

                                            <div className="flex-1 flex justify-between">
                                                <div>
                                                    <p className="text-sm text-text-heading">
                                                        {contract.project.title}
                                                    </p>

                                                    <p className="text-xs text-text-body">
                                                        {new Date(contract.createdAt).toLocaleDateString("en-GB")}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-green-500">${contract.agreedPrice}</p>
                                                    <p>{contract.status}</p>
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>

            }

        </div >
    );
}