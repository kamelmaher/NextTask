import { NavLink, useNavigate } from "react-router-dom";
import { AuthLayout, Field } from "../components/AuthLayout";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
import { signup } from "../features/auth/auth.reducer";


export default function RegisterPage() {
    const dispatch = useAppDispatch()
    const { err, loading } = useAppSelector(state => state.auth)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        title: "",
        password: ""
    })

    const inputFields = [
        { label: "First name", placeholder: "Alex", name: "firstName" },
        { label: "Last name", placeholder: "Sterling", name: "lastName" },
        { label: "Username", placeholder: "alex_sterling", name: "userName" },
        { label: "Email address", type: "email", placeholder: "alex@nextstack.io", name: "email" },
        { label: "Professional title", placeholder: "e.g. Senior Fullstack Developer", name: "title" },
        { label: "Password", type: "password", placeholder: "At least 8 characters", name: "password" },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await dispatch(signup(formData)).unwrap()
        navigate("/")
    }

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Set up your freelancer profile in under a minute."
            footer={
                <>
                    Already have an account?
                    <NavLink to="/login" className="font-semibold text-brand hover:underline">
                        Sign in
                    </NavLink>
                </>
            }
        >
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-3">
                    {
                        inputFields.map(field => <Field key={field.name} {...field} onChange={handleChange} />)
                    }
                </div>
                {err && <p className="text-red-500 font-semibold text-sm">{err}</p>}
                <button
                    type="submit"
                    className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-brand-foreground shadow-sm transition-transform hover:bg-brand/90 active:scale-[0.99]"
                >
                    {
                        loading ? <p>loading...</p> :
                            <p>Create account</p>
                    }
                </button>
                <p className="text-center text-xs text-text-dim">
                    By signing up you agree to NextStack's Terms and Privacy Policy.
                </p>
            </form>
        </AuthLayout>
    );
}
