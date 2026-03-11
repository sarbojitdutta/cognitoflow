import React from 'react';
import { useSelector } from 'react-redux';
import { Trophy, Zap, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const GamificationWidgets = () => {
    const { metrics, gamification, loading } = useSelector((state) => state.dashboard);

    if (loading || !gamification) return null;

    const progressPercentage = (gamification.xp % 100);
    const nextLevelXP = Math.ceil(gamification.xp / 100) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm bg-[#1a1a1a]/50 rounded-3xl shadow-2xl border border-gray-900 p-6 font-sans relative overflow-hidden"
        >
            
            {/* Subtle glow effect */}
            <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(0, 255, 163, 0.3) 0%, transparent 70%)' }}
            />

            {/* Header: Level & Badge */}
            <div className="relative flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1 h-4 bg-gradient-to-b from-[#00ffa3] to-transparent rounded-full" />
                        <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Developer Rank</h3>
                    </div>
                    <h2 className="text-4xl font-black text-white">Level {gamification.level}</h2>
                    <p className="text-gray-600 text-xs mt-1">Code Wizard</p>
                </div>
                
                {/* Animated Badge */}
                <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="h-16 w-16 bg-gradient-to-br from-[#00ffa3]/20 to-[#00ffa3]/5 border border-[#00ffa3]/30 rounded-2xl flex items-center justify-center shadow-lg shadow-[#00ffa3]/10"
                >
                    <Trophy className="w-8 h-8 text-[#00ffa3]" />
                </motion.div>
            </div>

            {/* XP Progress Section */}
            <div className="mb-6 bg-[#0a0a0a]/50 rounded-2xl p-4 border border-gray-900">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#00ffa3]" />
                        <span className="text-[#00ffa3] font-bold text-sm">{gamification.xp} XP</span>
                    </div>
                    <span className="text-gray-600 text-xs">
                        {nextLevelXP - gamification.xp} to Level {gamification.level + 1}
                    </span>
                </div>
                
                {/* Progress Bar */}
                <div className="relative w-full bg-gray-900 rounded-full h-2.5 overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00ffa3] to-[#00d98f] rounded-full shadow-[0_0_12px_rgba(0,255,163,0.5)]"
                    />
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                
                {/* Flawless PRs */}
                <motion.div
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#0a0a0a]/50 border border-gray-900 hover:border-[#00ffa3]/30 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
                >
                    <div className="w-10 h-10 rounded-xl bg-[#00ffa3]/10 flex items-center justify-center mb-2 group-hover:bg-[#00ffa3]/15 transition-colors">
                        <Award className="w-5 h-5 text-[#00ffa3]" />
                    </div>
                    <span className="text-white font-bold text-2xl">{gamification.flawlessReviews}</span>
                    <span className="text-gray-600 text-xs mt-1">Flawless PRs</span>
                </motion.div>

                {/* Bugs Squashed */}
                <motion.div
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#0a0a0a]/50 border border-gray-900 hover:border-red-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
                >
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-2 group-hover:bg-red-500/15 transition-colors">
                        <Target className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-white font-bold text-2xl">{metrics?.totalBugsFound || 0}</span>
                    <span className="text-gray-600 text-xs mt-1">Bugs Squashed</span>
                </motion.div>

            </div>

            {/* Achievement Badge Hint */}
            <div className="mt-4 pt-4 border-t border-gray-900">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Next Achievement</span>
                    <span className="text-[#00ffa3] font-medium">10 PRs away 🎯</span>
                </div>
            </div>

        </motion.div>
    );
};

export default GamificationWidgets;