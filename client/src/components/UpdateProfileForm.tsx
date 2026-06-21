import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { updateProfile } from "../features/auth/auth.reducer";
import Spinner from "./Spinner";

type UpdateProfileProps = {
    onClose: () => void
}
const UpdateProfileForm = ({ onClose }: UpdateProfileProps) => {
    const { user, updateProfileLoading, updateProfileErr } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()


    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        title: user?.title || "",
        about: user?.about || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await dispatch(updateProfile(formData)).unwrap()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* BACKDROP */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

            {/* MODAL */}
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-border rounded-xl p-6 shadow-xl">

                {/* CONTENT */}
                <h2 className="text-2xl font-bold mb-6">Update Profile</h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="text-sm font-medium">Professional Title</label>
                            <input
                                type="text"
                                name="title"
                                className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand"
                                placeholder="e.g. Full Stack Developer"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* About */}
                    <div>
                        <label className="text-sm font-medium">About</label>
                        <textarea
                            name="about"
                            className="w-full mt-1 border rounded-md p-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-brand"
                            value={formData.about || ""}
                            onChange={e => setFormData({ ...formData, about: e.target.value })}
                        />
                    </div>

                    {updateProfileErr && <p className="text-sm font-semibold text-red-500">{updateProfileErr}</p>}

                    {/* Submit */}
                    <div className="flex justify-center gap-2">
                        <button
                            type="submit"
                            className="p-2 bg-green-500 text-white py-2 rounded-md"
                        >
                            {
                                updateProfileLoading ? <Spinner size="sm" /> :
                                    "Save Changes"
                            }
                        </button>
                        <button
                            className="p-2 bg-gray-500 text-white py-2 rounded-md"
                            onClick={onClose}
                        >
                            cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileForm;