import { NavLink, useNavigate } from "react-router-dom";
import { AuthLayout, Field } from "../components/AuthLayout";
import { useAppDispatch, useAppSelector } from "../store/store";
import { login } from "../features/auth/auth.reducer";
import { useState, type FormEvent } from "react";
import Spinner from "../components/Spinner";

export default function LoginPage() {
    const dispatch = useAppDispatch()
    const { err, loading } = useAppSelector(state => state.auth)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        await dispatch(login({ email, password })).unwrap()
        navigate("/")
    }

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to manage your projects and proposals."
            footer={
                <>
                    Don't have an account?{" "}
                    <NavLink to="/register" className="font-semibold text-brand hover:underline">
                        Create one
                    </NavLink>
                </>
            }
        >
            <form
                className="space-y-5"
                onSubmit={handleLogin}
            >
                <Field label="Email address" type="email" placeholder="alex@nextstack.io" onChange={e => setEmail(e.target.value)} />
                <Field label="Password" type="password" placeholder="••••••••" onChange={e => setPassword(e.target.value)} />
                {err && <p className="text-red-500 font-semibold text-sm">{err}</p>}
                <div className="flex items-center justify-between text-sm">
                    {/* <a href="#" className="font-medium text-brand hover:underline">
                        Forgot password?
                    </a> */}
                </div>
                <button
                    type="submit"
                    className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-brand-foreground shadow-sm transition-transform hover:bg-brand/90 active:scale-[0.99]"
                >
                    {
                        loading ? <Spinner size="sm" /> :
                            <p>Sign in</p>
                    }
                </button>
            </form>
        </AuthLayout>
    );
}
