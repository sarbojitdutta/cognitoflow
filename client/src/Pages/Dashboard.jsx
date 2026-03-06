import React  from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { fetchDashboardmetrics } from "../Redux/Slices/dashboardSlice.js";
import GamificationWidgets from "../Components/GamificationWidgets.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { metrics , loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardmetrics())
  }, [dispatch])

  if(loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-950 p-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: Gamification Sidebar (Spans 1 column on large screens) */}
        <div className="lg:col-span-1 flex justify-center lg:justify-start items-start">
          <GamificationWidgets />
        </div>

        {/* RIGHT COLUMN: The Metric Cards (Spans 3 columns on large screens) */}
        <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
                Performance Metrics
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Metric Card 1 */}
              <div className="bg-black border border-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-gray-400 text-sm font-medium mb-2">PRs Reviewed</h3>
                <p className="text-3xl font-bold text-white">{metrics?.totalPRs || 0}</p>
              </div>

              {/* Metric Card 2 */}
              <div className="bg-black border border-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-gray-400 text-sm font-medium mb-2">Bugs Squashed</h3>
                <p className="text-3xl font-bold text-red-500">{metrics?.totalBugsFound || 0}</p>
              </div>

              {/* Metric Card 3 */}
              <div className="bg-black border border-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-gray-400 text-sm font-medium mb-2">Lines of Code Analyzed</h3>
                <p className="text-3xl font-bold text-green-500">{metrics?.totalCodeAdded || 0}</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  )
}
export default Dashboard