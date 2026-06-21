import { NavLink } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import StatCard from "../components/StatCard";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchProjects } from "../features/projects/projects.reducers";
import { useEffect } from "react";
import { ArrowRight, Users, Briefcase, Sparkles, Zap, Shield, Plus, Wallet, TrendingUp } from "lucide-react";
import Spinner from "../components/Spinner";
import { getUserStatics } from "../features/statics/statics.reducer";

export const HomePage = () => {
    const { user, isAuthenticated, fetchUserLoading } = useAppSelector(state => state.auth);
    const { projects, loading: projectsLoading } = useAppSelector(state => state.projects);
    const { userStatics, loading} = useAppSelector(state => state.statics)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProjects({}));
        dispatch(getUserStatics())
    }, [dispatch, user]);
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Hero Section - Creative Gradient */}
            {
                fetchUserLoading ? <Spinner size="lg" /> :
                    !isAuthenticated && (
                        <section className="relative overflow-hidden bg-[#0F172A] text-white">
                            {/* Animated Background Elements */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-3xl" />
                                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#A78BFA]/20 blur-3xl" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#7C3AED]/10 blur-3xl" />
                            </div>

                            <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
                                <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-8">
                                        <div className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 px-4 py-1.5">
                                            <Sparkles className="h-4 w-4 text-[#A78BFA]" />
                                            <span className="text-sm font-medium text-[#A78BFA]">Trusted by 12,400+ freelancers</span>
                                        </div>

                                        <h1 className="text-4xl lg:text-5xl xl:text-6xl text-white/90 font-bold leading-tight tracking-tight">
                                            Find Talent.{' '}
                                            <span className="bg-[#7C3AED] bg-clip-text text-transparent">Get Work Done.</span>{' '}
                                            Fast.
                                        </h1>

                                        <p className="text-lg text-[#94A3B8] max-w-lg">
                                            NextTask connects talented developers with meaningful projects.
                                            Browse, bid, and get hired — all in one secure platform.
                                        </p>

                                        <div className="flex flex-wrap gap-4">
                                            <NavLink
                                                to="/projects"
                                                className="group inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/30 transition-all hover:bg-[#5B21B6] hover:shadow-xl hover:shadow-[#7C3AED]/40"
                                            >
                                                Explore Projects
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </NavLink>
                                            <NavLink
                                                to="/register"
                                                className="inline-flex items-center gap-2 rounded-full border border-[#334155] bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1E293B]"
                                            >
                                                Become a Freelancer
                                            </NavLink>
                                        </div>

                                        {/* Stats Row */}
                                        <div className="flex gap-8 pt-4">
                                            <div>
                                                <p className="text-2xl font-bold text-white">2.4K+</p>
                                                <p className="text-sm text-[#64748B]">Active Projects</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-white">8.1K+</p>
                                                <p className="text-sm text-[#64748B]">Freelancers</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-white">$4.2M</p>
                                                <p className="text-sm text-[#64748B]">Paid Out</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Creative Widget - Floating Cards */}
                                    <div className="relative hidden lg:block">
                                        <div className="relative h-[400px]">
                                            {/* Main Card */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="h-10 w-10 rounded-full bg-[#7C3AED] flex items-center justify-center">
                                                        <Briefcase className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-white">Fintech Dashboard</p>
                                                        <p className="text-xs text-[#94A3B8]">Development • $3,500</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="h-2 rounded-full bg-white/20 w-full" />
                                                    <div className="h-2 rounded-full bg-white/20 w-3/4" />
                                                    <div className="h-2 rounded-full bg-[#7C3AED] w-1/2" />
                                                </div>
                                            </div>

                                            {/* Floating Badge 1 */}
                                            <div className="absolute top-8 right-0 float-animation">
                                                <div className="rounded-xl bg-[#10B981]/20 border border-[#10B981]/30 px-4 py-2 backdrop-blur-sm">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-2 rounded-full bg-[#10B981] status-pulse" />
                                                        <span className="text-xs font-medium text-[#10B981]">24 Proposals</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Floating Badge 2 */}
                                            <div className="absolute bottom-12 left-0 float-animation" style={{ animationDelay: '1s' }}>
                                                <div className="rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/30 px-4 py-2 backdrop-blur-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Zap className="h-4 w-4 text-[#F59E0B]" />
                                                        <span className="text-xs font-medium text-[#F59E0B]">Urgent</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Floating Badge 3 */}
                                            <div className="absolute top-20 left-4 float-animation" style={{ animationDelay: '2s' }}>
                                                <div className="rounded-xl bg-white/10 border border-white/20 px-3 py-1.5 backdrop-blur-sm">
                                                    <div className="flex items-center gap-1.5">
                                                        <Shield className="h-3 w-3 text-[#A78BFA]" />
                                                        <span className="text-xs text-[#A78BFA]">Verified</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

            <main className="mx-auto max-w-7xl px-6 py-10">
                {/* Authenticated User Dashboard */}
                {isAuthenticated && user && (
                    <div className="mb-10">
                        {/* Welcome Banner */}
                        <div className="mb-8 rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-sm">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E8FF] text-xl font-bold text-[#7C3AED]">
                                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#64748B]">Welcome back,</p>
                                        <h2 className="text-xl font-bold text-[#0F172A]">
                                            {user.firstName} {user.lastName}
                                            <span className="text-sm font-normal text-[#94A3B8] ml-2">• {user.title}</span>
                                        </h2>
                                    </div>
                                </div>
                                <NavLink
                                    to="/project/new"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#7C3AED]/20 transition-all hover:bg-[#5B21B6]"
                                >
                                    <Plus className="h-4 w-4" />
                                    Post New Project
                                </NavLink>
                            </div>
                        </div>

                        {/* Creative Stats Grid */}
                        {
                            loading ? <Spinner size="lg" /> :
                                userStatics &&
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                    <StatCard
                                        label="Wallet Balance"
                                        value={`$${(user.balance || 0).toFixed(2)}`}
                                        icon={<Wallet className="h-5 w-5" />}
                                        accent

                                    />
                                    <StatCard
                                        label="In Progress"
                                        value={`${userStatics.inProgress}`}
                                        icon={<Briefcase className="h-5 w-5" />}
                                        link="/profile/projects"
                                    // loading={contractLoading}

                                    />
                                    <StatCard
                                        label="Pending Proposals"
                                        value={`${userStatics.pendingProposals}`}
                                        icon={<TrendingUp className="h-5 w-5" />}
                                        link="/profile/proposals"
                                    // loading={proposalsLoading}
                                    />
                                    <StatCard
                                        label="Total Earnings"
                                        value={`$${userStatics.totalEarned}`}
                                        icon={<Sparkles className="h-5 w-5" />}
                                        accent
                                    />
                                </div>
                        }
                    </div>
                )}

                {/* Projects Section */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#0F172A]">Recommended Projects</h2>
                            <p className="text-sm text-[#64748B] mt-1">
                                {!isAuthenticated ? "Browse available freelance opportunities" : "Handpicked for your skills"}
                            </p>
                        </div>
                        <NavLink
                            to="/projects"
                            className="group inline-flex items-center gap-1 text-sm font-medium text-[#7C3AED] hover:text-[#5B21B6] transition-colors"
                        >
                            View all
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </NavLink>
                    </div>

                    {projectsLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="rounded-2xl bg-white border border-[#E2E8F0] p-6 space-y-4">
                                    <div className="shimmer h-12 w-12 rounded-xl" />
                                    <div className="shimmer h-4 w-3/4 rounded" />
                                    <div className="shimmer h-3 w-full rounded" />
                                    <div className="shimmer h-3 w-2/3 rounded" />
                                </div>
                            ))}
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="rounded-2xl bg-white border border-[#E2E8F0] p-12 text-center">
                            <div className="mx-auto h-16 w-16 rounded-full bg-[#F8FAFC] flex items-center justify-center mb-4">
                                <Briefcase className="h-8 w-8 text-[#94A3B8]" />
                            </div>
                            <p className="text-[#64748B] font-medium">No projects found</p>
                            <p className="text-sm text-[#94A3B8] mt-1">Check back later for new opportunities</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Feature Highlights - Creative Widgets */}
                {!isAuthenticated && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="group rounded-2xl bg-white border border-[#E2E8F0] p-6 card-hover">
                            <div className="h-12 w-12 rounded-xl bg-[#F3E8FF] flex items-center justify-center mb-4 group-hover:bg-[#7C3AED] transition-colors">
                                <Shield className="h-6 w-6 text-[#7C3AED] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Secure Payments</h3>
                            <p className="text-sm text-[#64748B]">Escrow protection ensures you get paid for every milestone completed.</p>
                        </div>

                        <div className="group rounded-2xl bg-white border border-[#E2E8F0] p-6 card-hover">
                            <div className="h-12 w-12 rounded-xl bg-[#D1FAE5] flex items-center justify-center mb-4 group-hover:bg-[#10B981] transition-colors">
                                <Users className="h-6 w-6 text-[#10B981] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Vetted Talent</h3>
                            <p className="text-sm text-[#64748B]">Every freelancer is verified to ensure quality and reliability.</p>
                        </div>

                        <div className="group rounded-2xl bg-white border border-[#E2E8F0] p-6 card-hover">
                            <div className="h-12 w-12 rounded-xl bg-[#DBEAFE] flex items-center justify-center mb-4 group-hover:bg-[#3B82F6] transition-colors">
                                <Zap className="h-6 w-6 text-[#3B82F6] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Fast Matching</h3>
                            <p className="text-sm text-[#64748B]">AI-powered matching connects you with the right projects in minutes.</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};