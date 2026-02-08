import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FaGithub, FaCheckCircle, FaTimesCircle, FaLink } from "react-icons/fa";
import { updateUser } from "../Redux/Slices/userSlice"; // Make sure this action exists in your slice
import { connectGithub } from "../Redux/Slices/userSlice";

const GitConnect = () => {
    const { user, token } = useSelector((state) => state.user); // Get logged-in user from Redux
    const dispatch = useDispatch();
    const [connectedUser, setConnectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [githubInput, setGithubInput] = useState(""); // State for the input field
    const [isConnecting, setIsConnecting] = useState(false);

    const githubAppUrl = "https://github.com/apps/cognitoflow-bot/installations/new";

    useEffect(() => {
        if (user?.githubUsername) {
            setConnectedUser(user.githubUsername);
            setLoading(false);
        } else {
            // Fallback fetch (optional if Redux is reliable)
            axios.get("http://localhost:3000/api/user/profile",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }) 
                .then(res => {
                    const userData = res.data.user || res.data
                    if (userData.isGithubConnected) {
                        setConnectedUser(userData.githubUsername);
                        // Sync Redux if needed
                        dispatch(updateUser(userData));
                    }
                })
                .catch(err => console.error("Failed to fetch user profile status", err))
                .finally(() => setLoading(false));
        }
    }, [user, dispatch, token]);

    const handleConnect = async () => {
        if (!githubInput) return alert("Please enter your GitHub username first.");

        setIsConnecting(true);


        // 1. Open GitHub Installation in a new tab
        window.open(githubAppUrl, "_blank");

        dispatch(connectGithub(githubInput))
            .unwrap() // Allows us to catch errors locally if needed
            .then((updatedUser) => {
                setConnectedUser(updatedUser.githubUsername);
                setGithubInput("");
            })
            .catch((err) => {
                console.error("Redux Connection Failed:", err);
                alert("Failed to link account.");
            })
            .finally(() => setIsConnecting(false));

    };
    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            {/* Main Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">

                {/* Header Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-800 p-4 rounded-full border border-gray-700 shadow-lg shadow-purple-900/10">
                        <FaGithub className="text-white text-4xl" />
                    </div>
                </div>

                {/* Title & Description */}
                <h1 className="text-2xl font-bold text-white mb-3">
                    GitHub Integration
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 px-4">
                    Connect your repository to <span className="text-blue-400 font-medium">CognitoFlow</span> to enable automatic AI code reviews,
                    PR summaries, and instant feedback directly in your workflow.
                </p>

                {/* --- ACTION SECTION --- */}
                <div className="mb-8 space-y-4">

                    {/* Input Field (Only show if NOT connected) */}
                    {!connectedUser && (
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 font-bold">@</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your GitHub Username"
                                className="w-full bg-gray-950 border border-gray-700 text-white text-sm rounded-lg block pl-8 p-2.5 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600 transition-colors"
                                value={githubInput}
                                onChange={(e) => setGithubInput(e.target.value)}
                            />
                            <p className="text-[10px] text-gray-500 mt-1 text-left ml-1">
                                * Must match your exact GitHub username
                            </p>
                        </div>
                    )}

                    {/* Connect Button */}
                    {connectedUser ? (
                        <a href={githubAppUrl} target="_blank" rel="noopener noreferrer">
                            <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 border border-gray-600">
                                <FaGithub className="text-lg" />
                                Manage Repositories
                            </button>
                        </a>
                    ) : (
                        <button
                            onClick={handleConnect}
                            disabled={isConnecting}
                            className={`w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 ${isConnecting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isConnecting ? (
                                <>Loading...</>
                            ) : (
                                <>
                                    <FaLink className="text-sm" />
                                    Link & Connect GitHub
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* --- STATUS SECTION --- */}
                <div className="border-t border-gray-800 pt-6 text-left">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Connection Status
                    </h3>

                    {loading ? (
                        <div className="animate-pulse flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg">
                            <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
                            <div className="h-3 w-32 bg-gray-700 rounded"></div>
                        </div>
                    ) : connectedUser ? (
                        // Connected State
                        <div className="flex items-center justify-between bg-gray-800/40 border border-green-900/30 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-500 text-lg" />
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase">Connected as</p>
                                    <p className="text-sm font-bold text-white">@{connectedUser}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => alert("Disconnect logic not implemented yet")}
                                className="text-xs text-red-400 hover:text-red-300 border border-red-900/50 hover:bg-red-900/20 px-3 py-1.5 rounded transition"
                            >
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        // Disconnected State
                        <div className="flex items-center gap-3 bg-gray-800/40 border border-gray-700 p-3 rounded-lg">
                            <FaTimesCircle className="text-gray-500 text-lg" />
                            <span className="text-gray-400 text-sm">Not connected yet</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default GitConnect;