import React from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { Code, Users, Zap, Bot, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { openAuth } from "../Redux/Slices/uiSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 400], [0, -80]);

  return (
    <div className="min-h-screen h-screen bg-[#0a0a0a] text-gray-100 flex flex-col items-center overflow-x-clip overflow-y-auto relative">
      
      {/* Subtle grid pattern overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 163, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 163, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Motion.div
          className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 163, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <Motion.div
          className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 163, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
          animate={{ 
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 text-center mt-32 md:mt-40 px-5 sm:px-8 max-w-6xl w-full">
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{ y: bgY }}
        >

          <Motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white">Build</span>
            <span className="text-[#00ffa3] mx-3">Faster</span>
            <br />
            <span className="text-white">Code</span>
            <span className="text-[#00ffa3] mx-3">Smarter</span>
          </Motion.h1>

          <Motion.p
            className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-normal leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            AI-powered code reviews, instant refactoring, and real-time collaboration for modern development teams.
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => dispatch(openAuth())}
              className="group relative px-8 py-4 rounded-xl text-base font-semibold bg-[#00ffa3] text-black hover:bg-[#00e69a] transition-all duration-200 overflow-hidden flex items-center gap-2 shadow-lg shadow-[#00ffa3]/20 hover:shadow-[#00ffa3]/40"
            >
              Launch CognitoFlow
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Motion.div>
        </Motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 mt-32 md:mt-40 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl px-6 w-full mb-20">
        {[
          {
            icon: Bot,
            title: "AI Code Review",
            text: "Autonomous analysis with smart refactoring and architecture insights.",
          },
          {
            icon: Zap,
            title: "Github Bot",
            text: "Instant PR reviews, issue triaging, and code suggestions right in your workflow.",
          },
          {
            icon: Users,
            title: "Dashboard",
            text: "Project insights and AI performance metrics for smarter development decisions.",
          },
        ].map(({ icon: Icon, title, text }, i) => (
          <Motion.div
            key={title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group p-8 rounded-2xl bg-[#1a1a1a]/50 border border-gray-900 hover:border-[#00ffa3]/30 hover:bg-[#1a1a1a] transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#00ffa3]/10 flex items-center justify-center mb-5 group-hover:bg-[#00ffa3]/15 transition-colors">
              <Icon className="w-6 h-6 text-[#00ffa3]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
          </Motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-8 text-gray-700 text-xs text-center border-t border-gray-900 w-full">
        <p>
          Built by <span className="text-[#00ffa3] font-medium">Sarbojit</span> · 2026
        </p>
      </footer>
    </div>
  );
};

export default Home;