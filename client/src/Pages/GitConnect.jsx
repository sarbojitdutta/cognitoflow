import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disconnectGithub } from '../Redux/Slices/userSlice';

export const GitConnect = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const handleConnect = () => {
    window.location.href = 'https://github.com/apps/cognitoflow-bot/installations/new';
  };

  const handleDisconnect = () => {
    dispatch(disconnectGithub());
  };

  const isConnected = user?.isGithubconnected;
  const githubUsername = user?.githubUsername;

  return (
    <div className="flex items-center justify-center p-4 bg-[#0a0a0a] min-h-screen relative overflow-hidden">

      

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm bg-[#0a0a0a] backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/60 overflow-hidden border border-emerald-900/40 hover:border-emerald-700/40 transition-all duration-500 hover:shadow-emerald-900/20 font-sans">

        {isConnected ? (
          /* ── Connected State ── */
          <div className="p-8 flex flex-col items-center text-center">

            {/* Success Icon */}
            <div className="mb-6 relative">
              <div className="h-20 w-20 bg-gradient-to-br from-emerald-600/30 to-green-800/20 rounded-full flex items-center justify-center relative z-10 border border-emerald-500/30 shadow-lg shadow-emerald-900/30">
                <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Pulsing ring */}
              <div className="absolute top-0 left-0 h-20 w-20 bg-emerald-500 rounded-full animate-ping opacity-10 z-0" />
              <div className="absolute top-0 left-0 h-20 w-20 bg-emerald-400 rounded-full animate-pulse opacity-5 z-0" />
            </div>

            {/* Title */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-5 bg-gradient-to-b from-emerald-400 to-green-600 rounded-full" />
              <h2 className="text-2xl font-extrabold text-white">Account Linked!</h2>
            </div>

            <p className="text-gray-400 mb-3 text-sm">
              Connected as{' '}
              <span className="font-bold text-emerald-400">@{githubUsername}</span>
            </p>

            {/* Badge */}
            <span className="text-xs text-emerald-300 font-medium bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-8 tracking-wide">
              ✦ Ready for AI Reviews
            </span>

            {/* Stats row */}
            <div className="w-full grid grid-cols-2 gap-3 mb-8">
              <div className="bg-[#0f1a0f] border border-emerald-900/40 rounded-2xl p-3 text-center">
                <p className="text-emerald-400 text-lg font-bold">Active</p>
                <p className="text-gray-600 text-xs mt-0.5">Connection</p>
              </div>
              <div className="bg-[#0f1a0f] border border-emerald-900/40 rounded-2xl p-3 text-center">
                <p className="text-green-400 text-lg font-bold">AI</p>
                <p className="text-gray-600 text-xs mt-0.5">Reviews On</p>
              </div>
            </div>

            {/* Disconnect Button */}
            <button
              onClick={handleDisconnect}
              disabled={loading}
              className="w-full group flex items-center justify-center gap-2 py-3 px-6 border border-red-600/50 hover:border-red-500 text-red-500 hover:text-red-400 font-bold rounded-2xl bg-red-500/5 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Disconnect GitHub
                </>
              )}
            </button>
          </div>

        ) : (
          /* ── Disconnected State ── */
          <div className="flex flex-col">

            {/* Top Header Banner */}
            <div className="bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-800 p-8 flex flex-col items-center text-center text-white relative overflow-hidden">
              {/* Banner glow overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.06),transparent_60%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

              {/* GitHub icon */}
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-5 shadow-xl">
                <svg fill="currentColor" className="w-12 h-12 text-white" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>

              <h2 className="relative z-10 text-2xl font-extrabold mb-2 tracking-tight">Supercharge your Workflow</h2>
              <p className="relative z-10 text-emerald-100/80 text-sm">
                Connect GitHub to enable automatic AI Pull Request reviews.
              </p>
            </div>

            {/* Bottom Action Area */}
            <div className="p-8 flex flex-col gap-6">

              {/* Feature list */}
              <div className="space-y-3">
                {[
                  { label: "Instant AI Feedback on every PR" },
                  { label: "Secure OAuth Connection" },
                  { label: "Auto bug detection & suggestions" },
                ].map(({ label }) => (
                  <div key={label} className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {label}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-emerald-900/60 to-transparent" />

              {/* Connect Button */}
              <button
                onClick={handleConnect}
                className="w-full py-4 px-6 bg-emerald-500 text-black text-base font-bold rounded-2xl shadow-xl shadow-emerald-900/40 hover:shadow-emerald-900/60 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
              >
                <span>Connect GitHub Now</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <p className="text-xs text-gray-600 text-center">
                You will be redirected to GitHub to authorize.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitConnect;