import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardmetrics } from "../Redux/Slices/dashboardSlice.js";
import GamificationWidgets from "../Components/GamificationWidgets.jsx";
import { GitPullRequest, Bug, Code2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { metrics, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardmetrics());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#00ffa3]/30 border-t-[#00ffa3] rounded-full animate-spin" />
          <p className="text-[#00ffa3]/70 text-sm font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6 font-sans relative overflow-hidden">

      {/* Background subtle glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 163, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

        <div className="lg:col-span-3">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-gradient-to-b from-[#00ffa3] to-transparent rounded-full" />
              <h2 className="text-3xl font-bold text-white">Performance Metrics</h2>
            </div>
            <p className="text-gray-600 text-sm ml-4">Track your coding achievements and impact</p>
          </motion.div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* PRs Reviewed Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-[#1a1a1a]/50 border border-gray-900 hover:border-[#00ffa3]/30 p-6 rounded-2xl transition-all duration-300 hover:bg-[#1a1a1a] cursor-pointer relative overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ffa3]/0 to-[#00ffa3]/0 group-hover:from-[#00ffa3]/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00ffa3]/10 flex items-center justify-center group-hover:bg-[#00ffa3]/15 transition-colors">
                    <GitPullRequest className="w-5 h-5 text-[#00ffa3]" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-gray-700 group-hover:text-[#00ffa3]/50 transition-colors" />
                </div>
                <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">PRs Reviewed</h3>
                <p className="text-4xl font-bold text-white mb-1">{metrics?.totalPRs || 0}</p>
                <div className="h-0.5 w-12 bg-gradient-to-r from-[#00ffa3] to-transparent rounded-full mt-3" />
              </div>
            </motion.div>

            {/* Bugs Squashed Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group bg-[#1a1a1a]/50 border border-gray-900 hover:border-red-500/20 p-6 rounded-2xl transition-all duration-300 hover:bg-[#1a1a1a] cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/15 transition-colors">
                    <Bug className="w-5 h-5 text-red-500" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-gray-700 group-hover:text-red-500/50 transition-colors" />
                </div>
                <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">Bugs Squashed</h3>
                <p className="text-4xl font-bold text-white mb-1">{metrics?.totalBugsFound || 0}</p>
                <div className="h-0.5 w-12 bg-gradient-to-r from-red-500 to-transparent rounded-full mt-3" />
              </div>
            </motion.div>

            {/* Lines Analyzed Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="group bg-[#1a1a1a]/50 border border-gray-900 hover:border-[#00ffa3]/30 p-6 rounded-2xl transition-all duration-300 hover:bg-[#1a1a1a] cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ffa3]/0 to-[#00ffa3]/0 group-hover:from-[#00ffa3]/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00ffa3]/10 flex items-center justify-center group-hover:bg-[#00ffa3]/15 transition-colors">
                    <Code2 className="w-5 h-5 text-[#00ffa3]" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-gray-700 group-hover:text-[#00ffa3]/50 transition-colors" />
                </div>
                <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">Lines Analyzed</h3>
                <p className="text-4xl font-bold text-white mb-1">
                  {metrics?.totalCodeAdded ? (metrics.totalCodeAdded / 1000).toFixed(1) + 'K' : 0}
                </p>
                <div className="h-0.5 w-12 bg-gradient-to-r from-[#00ffa3] to-transparent rounded-full mt-3" />
              </div>
            </motion.div>

          </div>

        </div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1 flex justify-center lg:justify-start items-start"
        >
          <GamificationWidgets />
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;