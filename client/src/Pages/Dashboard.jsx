import { ArrowUpRight, Users, Code, Activity, Sparkles } from "lucide-react"

function Dashboard() {
  return (
    <div className="flex-1 bg-[#0B0B0F] text-gray-100 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-gray-400 mb-8">
        Track your team&apos;s performance and growth metrics
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="rounded-2xl bg-[#14141A] p-6 border border-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm text-gray-400">Active Projects</p>
              <h2 className="text-3xl font-semibold mt-2">12</h2>
            </div>
            <div className="p-3 rounded-lg bg-purple-600/20">
              <Activity className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-green-400 text-sm font-medium">
            <ArrowUpRight className="h-4 w-4" /> +12%
          </div>
        </div>

        <div className="rounded-2xl bg-[#14141A] p-6 border border-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm text-gray-400">Team Members</p>
              <h2 className="text-3xl font-semibold mt-2">24</h2>
            </div>
            <div className="p-3 rounded-lg bg-indigo-600/20">
              <Users className="h-6 w-6 text-indigo-500" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-green-400 text-sm font-medium">
            <ArrowUpRight className="h-4 w-4" /> +3%
          </div>
        </div>

        <div className="rounded-2xl bg-[#14141A] p-6 border border-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm text-gray-400">Code Reviews</p>
              <h2 className="text-3xl font-semibold mt-2">156</h2>
            </div>
            <div className="p-3 rounded-lg bg-green-600/20">
              <Code className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-green-400 text-sm font-medium">
            <ArrowUpRight className="h-4 w-4" /> +18%
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="rounded-2xl bg-[#14141A] p-6 border border-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm text-gray-400">AI Suggestions</p>
              <h2 className="text-3xl font-semibold mt-2">1,247</h2>
            </div>
            <div className="p-3 rounded-lg bg-pink-600/20">
              <Sparkles className="h-6 w-6 text-pink-500" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-green-400 text-sm font-medium">
            <ArrowUpRight className="h-4 w-4" /> +32%
          </div>
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Team Performance */}
        <div className="rounded-2xl bg-[#14141A] p-6 border border-gray-800 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Team Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Alice Johnson</p>
                <p className="text-sm text-gray-400">45 reviews</p>
              </div>
              <p className="text-green-400 font-semibold">94% accuracy</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Bob Smith</p>
                <p className="text-sm text-gray-400">38 reviews</p>
              </div>
              <p className="text-green-400 font-semibold">91% accuracy</p>
            </div>
          </div>
        </div>

        {/* Individual Growth */}
        <div className="rounded-2xl bg-[#14141A] p-6 border border-gray-800 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Individual Growth</h3>
          <div className="space-y-4">
            {[
              { label: "Code Quality", value: 92 },
              { label: "Review Speed", value: 85 },
              { label: "Collaboration", value: 78 },
              { label: "Problem Solving", value: 89 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="text-gray-400">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-[#1E1E27] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
