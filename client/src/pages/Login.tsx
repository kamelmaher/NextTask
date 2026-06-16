import { NavLink, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { useAppDispatch, useAppSelector } from "../store/store";
import { login } from "../features/auth/auth.reducer";
import { useState, type FormEvent } from "react";
import Spinner from "../components/Spinner";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const { err, loading } = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(login({ email, password })).unwrap();
        navigate("/");
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to manage your projects and proposals."
            footer={
                <>
                    Don't have an account?{" "}
                    <NavLink to="/register" className="font-semibold text-[#7C3AED] hover:text-[#5B21B6] transition-colors">
                        Create one
                    </NavLink>
                </>
            }
        >
            <form className="space-y-5" onSubmit={handleLogin}>
                <div className="relative">
                    <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                            Email address
                        </span>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                            <input
                                type="email"
                                placeholder="alex@nexttask.io"
                                onChange={e => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-4 py-3 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#F3E8FF]"
                                required
                            />
                        </div>
                    </label>
                </div>

                <div className="relative">
                    <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                            Password
                        </span>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                onChange={e => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-10 py-3 text-sm text-[#0F172A] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#F3E8FF]"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </label>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-[#E2E8F0] text-[#7C3AED] focus:ring-[#F3E8FF]" />
                        <span className="text-[#64748B]">Remember me</span>
                    </label>
                    <a href="#" className="font-medium text-[#7C3AED] hover:text-[#5B21B6] transition-colors">
                        Forgot password?
                    </a>
                </div>

                {err && (
                    <div className="rounded-lg bg-[#FEE2E2] border border-[#FECACA] p-3 text-sm text-[#EF4444]">
                        {err}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#7C3AED] py-3 text-sm font-semibold text-white shadow-sm shadow-[#7C3AED]/20 transition-all hover:bg-[#5B21B6] hover:shadow-md disabled:opacity-50"
                >
                    {loading ? <Spinner size="sm" /> : "Sign in"}
                </button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#E2E8F0]" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-2 text-[#94A3B8]">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white py-2.5 text-sm font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors">
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white py-2.5 text-sm font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
}