import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser, registerUser } from "../Redux/Slices/userSlice";
import { closeAuth } from "../Redux/Slices/uiSlice";
import {Eye, EyeOff} from "lucide-react";

export default function AuthModal() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user)
  const { isOpen } = useSelector(state => state.auth)

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" })

  if (!isOpen) return null

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {
      let actionResult;

      if (isLogin) {
        // 1. Dispatch the action and wait for the result
        actionResult = await dispatch(loginUser({
          email: formData.email,
          password: formData.password
        }));
      } else {
        actionResult = await dispatch(registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }));
      }

      // 2. Check if the action was FULFILLED (Success)
      if (loginUser.fulfilled.match(actionResult) || registerUser.fulfilled.match(actionResult)) {
        toast.success(isLogin ? "Login Successful" : "Registration Successful", { position: "top-center" });

        // 3. Close modal ONLY on success
        dispatch(closeAuth());

        // Optional: Reset form
        setFormData({ username: "", email: "", password: "" });
      } else {
        // 4. Handle Redux Rejection (Backend returned error)
        // actionResult.payload contains the rejectWithValue message
        throw new Error(actionResult.payload?.message || "Authentication failed");
      }

    } catch (error) {
      // 5. Catch errors (including the one we threw above)
      console.error("Auth Error:", error);
      toast.error(error.message || "Something went wrong", { position: "top-center" });
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/60 z-50"
      onClick={() => dispatch(closeAuth())} // close when clicking outside box
    >
      <Motion.div
        className="relative w-[380px] rounded-2xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-lg p-8 text-white"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <div className="relative h-[220px] overflow-hidden">

          <AnimatePresence mode="wait">
            {isLogin ? (
              <Motion.form
                onSubmit={(e) => { handleSubmit(e) }}
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
                />
                <div className="relative w-full mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute flex items-center right-3 top-2.5 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 text-black rounded-lg bg-[#00ffa3] hover:bg-[#00e69a] ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"
                    }`}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </Motion.form>
            ) : (
              <Motion.form
                onSubmit={(e) => { handleSubmit(e) }}
                key="register"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"

              >
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
                />
                <div className="relative w-full mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute flex items-center right-3 top-2.5 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 text-black rounded-lg bg-[#00ffa3] hover:bg-[#00e69a] ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"
                    }`}
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </Motion.form>
            )}
          </AnimatePresence>
        </div>


        <div className="text-center mt-6 text-sm">
          {isLogin ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-[#00ffa3] hover:underline cursor-pointer"
              >
                Create one
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)} className="text-[#00ffa3] hover:underline cursor-pointer">
                Login here
              </button>
            </p>
          )}
        </div>
      </Motion.div>
    </div>
  );
}