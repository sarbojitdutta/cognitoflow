import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser, registerUser } from "../Redux/Slices/userSlice";
import { closeAuth } from "../Redux/Slices/uiSlice";

export default function AuthModal() {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.user)
  const {isOpen} = useSelector(state => state.auth)

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" })

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      if(isLogin){
        await dispatch(loginUser({email: formData.email, password: formData.password})).unwrap()
        toast.success("Login Successful",{position: "top-center"})
      }else{
        await dispatch(registerUser({username: formData.username, email: formData.email, password: formData.password})).unwrap()
        toast.success("Registration Successful",{position: "top-center"})
      }
      dispatch(closeAuth())
    }catch(error){
      toast.error(err || "Something went wrong",{position: "top-center"})
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/60 z-50"
      onClick={() => dispatch(closeAuth())} // close when clicking outside box
    >
      <motion.div
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
              <motion.form
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
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"
                  }`}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </motion.form>
            ) : (
              <motion.form
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
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 cursor-pointer"
                  }`}
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>


        <div className="text-center mt-6 text-sm">
          {isLogin ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-purple-400 hover:underline cursor-pointer"
              >
                Create one
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)} className="text-purple-400 hover:underline cursor-pointer">
                Login here
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}