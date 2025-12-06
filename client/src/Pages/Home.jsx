import React from "react";
import { motion } from "framer-motion";
import { Code, Users, Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { openAuth } from "../Redux/Slices/uiSlice";

const Home = () => {
  const dispatch = useDispatch()
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100 flex flex-col items-center overflow-x-hidden">
      <section className="text-center mt-24 px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Collaborate. Code. Create.
        </motion.h1>

        <motion.p
          className="mt-4 text-gray-400 max-w-xl mx-auto text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          CognitoFlow is your AI-powered workspace — built for developers who
          code, learn, and create together.
        </motion.p>

        
        <motion.button
          onClick= {()=> dispatch(openAuth())}
          className="mt-8 px-8 py-3 rounded-xl text-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>
      </section>

      
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl px-6">
        {[
          {
            icon: Code,
            title: "AI Code Review",
            text: "Get instant insights and improvements for your code.",
          },
          {
            icon: Users,
            title: "Live Collaboration",
            text: "Work with teammates in real-time with synced updates.",
          },
          {
            icon: Settings,
            title: "Smart Dashboard",
            text: "Track your coding journey with analytics and insights.",
          },
        ].map(({ icon: Icon, title, text }) => (
          <motion.div
            key={title}
            className="p-8 rounded-2xl bg-[#14141A] hover:bg-[#1A1A22] transition duration-300 cursor-default"
            whileHover={{ scale: 1.03 }}
          >
            <Icon className="w-12 h-12 text-purple-400 mb-5" />
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-gray-400">{text}</p>
          </motion.div>
        ))}
      </section>

      
      <footer className="mt-24 mb-6 text-gray-500 text-sm text-center">
        Made with ❤️ by <span className="text-purple-400">Sarbojit</span>
      </footer>
    </div>
  );
};

export default Home;
