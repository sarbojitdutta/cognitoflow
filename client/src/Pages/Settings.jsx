import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Redux/Slices/userSlice";
import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { User, Lock, Save } from "lucide-react";


export default function Settings() {
  const dispatch = useDispatch()

  const { user, loading, error } = useSelector((state) => state.user)
  const [profile, setProfile] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || ""
  })
  const [password, setPassword] = useState({
    password: "",
  })
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    if (user) {
      setProfile({
        username: user?.username || "",
        email: user?.email || "",
        bio: user.bio || ""
      })
    }
  }, [user])

  const handleProfileChange = (e) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handlePasswordChange = (e) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(updateUser(profile))

    if (updateUser.fulfilled.match(result)) {
      alert("Profile updated successfully!")
    } else {
      alert(result.payload || "Failed to update profile")
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(updateUser({ password: password.password }))

    if (updateUser.fulfilled.match(result)) {
      alert("Password updated successfully!")
      setPassword({ password: "" })
    } else {
      setPasswordError(result.payload || "Failed to update password")
    }
  }

  return (
    <div className={`min-h-screen h-screen bg-[#0a0a0a] text-gray-100 flex flex-col items-center overflow-x-clip overflow-y-auto relative pb-20`}>

      <div className="relative z-10 w-full max-w-3xl px-5 sm:px-8 py-12 md:py-16">

        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-green-300">
              Settings
            </span>
          </h1>
          <p className="mt-3 text-gray-500 text-lg">Manage your account settings</p>
        </Motion.div>

        {/* Profile Form Section */}
        <Motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-8"
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-600/30 to-emerald-800/20 flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-900/20">
              <User className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                Profile Information
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">Update your personal details</p>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div className="bg-[#1a1a1a] backdrop-blur-xl border border-emerald-900/40 rounded-2xl p-6 space-y-5">

              {/* Username Field */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleProfileChange}
                  placeholder="Enter your Username"
                  className="w-full px-4 py-3 bg-[#0a0a0a] focus:border-emerald-500/50 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="Enter your Email"
                  className="w-full px-4 py-3 bg-[#0a0a0a] rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                />
              </div>

              {/* Bio Field */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                  placeholder="Enter your Bio"
                  rows="4"
                  className="w-full px-4 py-3 bg-[#0a0a0a] rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#00ffa3] hover:bg-[#00e69a] text-black font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Update Profile
                </>
              )}
            </button>
          </form>
        </Motion.section>

        {/* Password Form Section */}
        <Motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600/30 to-green-800/20 flex items-center justify-center border border-green-500/20 shadow-lg shadow-green-900/20">
              <Lock className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                Change Password
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">Secure your account with a new password</p>
            </div>
          </div>

          {/* Password Form */}
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div className="bg-[#1a1a1a] backdrop-blur-xl border border-emerald-900/40 rounded-2xl p-6">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password.password}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 bg-[#0a0a0a] rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                />
                {passwordError && (
                  <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {passwordError}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#00ffa3] hover:bg-[#00e69a] text-black font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Update Password
                </>
              )}
            </button>
          </form>
        </Motion.section>

      </div>
    </div>
  )
}