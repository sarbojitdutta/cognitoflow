import React  from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { fetchDashboardMetrics } from "../Redux/Slices/dashboardSlice.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { metrics , loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardMetrics())
  }, [dispatch])

  if(loading) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Metric Card 1 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500">PRs Reviewed</h3>
        <p className="text-3xl font-bold">{metrics?.totalPRs || 0}</p>
      </div>

      {/* Metric Card 2 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500">Bugs Squashed</h3>
        <p className="text-3xl font-bold text-red-500">{metrics?.totalBugsFound || 0}</p>
      </div>

      {/* Metric Card 3 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-gray-500">Lines of Code Analyzed</h3>
        <p className="text-3xl font-bold text-green-500">{metrics?.totalCodeAdded || 0}</p>
      </div>
    </div>
  )
}
export default Dashboard