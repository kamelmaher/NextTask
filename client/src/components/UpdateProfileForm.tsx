import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getCategories } from "../features/category/category.reducer";
import { updateProfile } from "../features/auth/auth.reducer";
import Spinner from "./Spinner";

type UpdateProfileProps = {
    onClose: () => void
}
const UpdateProfileForm = ({ onClose }: UpdateProfileProps) => {
    const { user, updateProfileLoading, updateProfileErr } = useAppSelector(state => state.auth)
    // const { categories, loading, err } = useAppSelector(state => state.category)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        title: user?.title || "",
        about: user?.about || "",
        // categoryId: user?.category.title || ""
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

                    {/* Main Category */}
                    {/* <div>
                        <label className="text-sm font-medium">Main Category</label>
                        {
                            loading ? <span>loading...</span> :
                                categories.length === 0 ? <span>No categories found</span> :
                                    <select
                                        name="categoryId"
                                        className="w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brand"
                                        value={formData.categoryId}
                                        onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                                    >
                                        <option value="">Select category</option>
                                        {
                                            categories.map(category => <option key={category._id} value={category._id}>{category.title}</option>)
                                        }
                                    </select>
                        }
                    </div> */}

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
                    <button
                        type="submit"
                        className="w-full bg-brand text-white py-2 rounded-md font-semibold hover:bg-brand/90 transition"
                    >
                        {
                            updateProfileLoading ? <Spinner size="sm" /> :
                                "Save Changes"
                        }
                    </button>
                </form>
            </div>
        </div>

    );
};

export default UpdateProfileForm;