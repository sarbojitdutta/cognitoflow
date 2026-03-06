import React from 'react'
import { useSelector } from 'react-redux'

const GamificationWidgets = () => {
    const { metrics, gamification, loading} = useSelector((state) => state.dashboard)

    if(loading || !gamification) return null;

    const progressPercentage = (gamification.xp % 100)

    return (
        <div className="w-full max-w-sm bg-black rounded-3xl shadow-2xl border border-gray-800 p-6 font-sans">
            
            {/* Header: Level & Title */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Developer Rank</h3>
                    <h2 className="text-3xl font-extrabold text-white">Level {gamification.level}</h2>
                </div>
                <div className="h-14 w-14 bg-green-900/50 border border-green-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🧙‍♂️</span>
                </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-green-400">{gamification.xp} Total XP</span>
                    <span className="text-gray-500">{100 - progressPercentage}% XP to Level {gamification.level + 1}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                    <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Badges / Achievements */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-xl mb-1">✨</span>
                    <span className="text-white font-bold text-lg">{gamification.flawlessReviews}</span>
                    <span className="text-gray-500 text-xs">Flawless PRs</span>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-xl mb-1">🐛</span>
                    <span className="text-red-400 font-bold text-lg">{metrics?.totalBugsFound || 0}</span>
                    <span className="text-gray-500 text-xs">Bugs Squashed</span>
                </div>
            </div>
        </div>
    )
}
export default GamificationWidgets