import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Redux/Slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UpdateUser() {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user)
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        bio: user?.bio || "",

    });
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const saveChange = async (e) => {
        e.preventDefault()
        try {
            const res = await dispatch(updateUser(formData)).unwrap()
            toast.success("Profile Updated Successfully !", { position: "top-center" });
        } catch (error) {
            toast.error("Something went wrong", { position: "top-center" });
        }
    }

    return (
        <form
            className="space-y-8 max-w-xl mx-auto bg-[#121214] p-6 rounded-xl border border-gray-800"
            onSubmit={saveChange}
        >
            <h2 className="text-xl text-white font-semibold mb-4">Edit Profile</h2>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Username
                    </label>
                    <input
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1A1A1F] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1A1A1F] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio
                </label>
                <textarea
                    name="bio"
                    rows={5}
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Write a short bio about yourself..."
                    className="w-full px-4 py-3 bg-[#1A1A1F] border border-gray-700 rounded-lg text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`px-4 py-3 rounded-lg text-white font-medium transition ${loading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700 cursor-pointer"
                    }`}
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
}

export default UpdateUser;