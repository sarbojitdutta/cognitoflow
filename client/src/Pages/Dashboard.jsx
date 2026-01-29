import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // To get the logged-in username
import { 
  GitPullRequest, 
  CheckCircle, 
  Activity, 
  GitMerge, 
  ShieldAlert 
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Keep the chart mock data for now (Charts require complex aggregation to make real)
const activityData = [
  { name: 'Mon', reviews: 2 },
  { name: 'Tue', reviews: 5 },
  { name: 'Wed', reviews: 3 },
  { name: 'Thu', reviews: 8 },
  { name: 'Fri', reviews: 4 },
  { name: 'Sat', reviews: 1 },
  { name: 'Sun', reviews: 0 },
];

const Dashboard = () => {
  const { user } = useSelector((state) => state.user); // Get logged-in user
  const [loading, setLoading] = useState(true);
  
  // State for real data
  const [stats, setStats] = useState({
    prsReviewed: 0,
    bugsCaught: 0,
    repoHealth: "0%",
    activeRepos: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Only fetch if we have a user
    if (user) {
      // Assuming your 'username' in Redux matches the 'repoOwner' in GitHub
      // If not, you might need to store 'githubUsername' in your Redux state
      const githubName = user.githubUsername || user.username; // Fallback for testing
      if(!githubName) return;

      axios.get(`http://localhost:3000/api/dashboard/${githubName}`)
        .then(res => {
          setStats(res.data.stats);
          setRecentActivity(res.data.recentActivity);
          setLoading(false);
        })
        .catch(err => console.error("Failed to load dashboard:", err));
    }
  }, [user]);

  if (loading) return <div className="p-8 text-white">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen w-full bg-[#0B0B0F] text-gray-200 p-8 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
        <p className="text-gray-400">
            Welcome back, {user?.username || "Developer"}! Here is your activity summary.
        </p>
      </div>

      {/* --- Section 1: Dynamic Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* PRs Reviewed */}
        <div className="bg-[#14141A] border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <GitPullRequest className="text-blue-500 h-6 w-6" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">PRs Reviewed</h3>
          <p className="text-3xl font-bold text-white mt-1">{stats.prsReviewed}</p>
        </div>

        {/* Bugs Caught */}
        <div className="bg-[#14141A] border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <ShieldAlert className="text-red-500 h-6 w-6" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Potential Bugs</h3>
          <p className="text-3xl font-bold text-white mt-1">{stats.bugsCaught}</p>
        </div>

        {/* Repo Health */}
        <div className="bg-[#14141A] border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <Activity className="text-green-500 h-6 w-6" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Repo Health</h3>
          <p className="text-3xl font-bold text-white mt-1">{stats.repoHealth}</p>
        </div>

        {/* Active Repos */}
        <div className="bg-[#14141A] border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <GitMerge className="text-purple-500 h-6 w-6" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Active Repos</h3>
          <p className="text-3xl font-bold text-white mt-1">{stats.activeRepos}</p>
        </div>
      </div>

      {/* --- Section 2: Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart (Static for now) */}
        <div className="lg:col-span-2 bg-[#14141A] border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Review Activity</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a35" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#6b7280" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{backgroundColor: '#1f2937', border: 'none', color: '#fff'}} />
                <Line type="monotone" dataKey="reviews" stroke="#8b5cf6" strokeWidth={3} dot={{fill: '#8b5cf6'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity (Dynamic) */}
        <div className="bg-[#14141A] border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#1A1A22] transition-colors border border-transparent hover:border-gray-800 cursor-pointer">
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                    item.type === 'danger' ? 'bg-red-500' : 'bg-green-500'
                  }`} />
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {item.repo} <span className="text-gray-500 mx-1">•</span> {item.pr}
                    </p>
                    <p className={`text-xs mt-0.5 ${
                      item.type === 'danger' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {item.status}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap">{item.time}</span>
                </div>
              ))
            ) : (
                <p className="text-gray-500 text-sm">No activity found yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;