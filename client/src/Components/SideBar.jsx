import { useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Code,
  Users,
  Settings,
  Workflow,
  User,
  LogIn,
  LogOut,
  Home,
} from "lucide-react";
import AuthModal from "./AuthModal";
import { logout } from "../Redux/Slices/userSlice";
import { openAuth } from "../Redux/Slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";

function SideBar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // 1. Get the current user from Redux
  const { user } = useSelector((state) => state.user);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Code Lab", path: "/codelab", icon: Code },
    { name: "Gitconnect", path: "/connect", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  // 3. Logout Logic
  const handleLogout = () => {
    dispatch(logout()); // Clears Redux State
    navigate("/");      // Redirects to Home
  };

  return (
    <>
      <div
        ref={sidebarRef}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`flex h-screen flex-col justify-between border-r border-gray-700 bg-[#0B0B0F] text-gray-200 transition-all duration-300 ease-in-out ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        {/* --- Top Section: Logo & Nav --- */}
        <div>
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-gray-700 px-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-900/20">
              <Workflow className="h-6 w-6 text-white" />
            </div>
            <span
              className={`text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              CognitoFlow
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="mt-6 flex flex-col gap-2 px-3">
            {navItems.map(({ name, path, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 relative group ${
                    active
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/20"
                      : "text-gray-400 hover:bg-[#1A1A22] hover:text-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-center shrink-0">
                     <Icon className={`h-5 w-5 ${active ? "text-white" : ""}`} />
                  </div>

                  <span
                    className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                      isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                    }`}
                  >
                    {name}
                  </span>

                  {/* Tooltip (Visible when collapsed) */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-gray-700 shadow-xl">
                      {name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* --- Bottom Section: Profile & Auth --- */}
        <div className="border-t border-gray-700 p-3">
          
          {/* User Profile (Only visible if logged in) */}
          {user && (
            <div
              className={`mb-3 flex items-center gap-3 rounded-xl bg-[#14141A] p-3 transition-all duration-300 overflow-hidden ${
                isExpanded ? "opacity-100 translate-y-0" : "hidden opacity-0"
              }`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">
                  {user.username || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email || "Member"}
                </p>
              </div>
            </div>
          )}

          {/* DYNAMIC BUTTON: Switch based on 'user' state */}
          {user ? (
            // 2. If User Exists -> Show LOGOUT
            <button
              onClick={handleLogout}
              className="group flex w-full items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-3 text-sm font-medium text-red-400 transition-all hover:bg-red-500 hover:text-white"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                }`}
              >
                Log Out
              </span>
              
              {!isExpanded && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-red-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                  Log Out
                </div>
              )}
            </button>
          ) : (
            // 1. & 4. If No User -> Show LOGIN
            <button
              onClick={() => dispatch(openAuth())}
              className="group flex w-full items-center gap-3 rounded-xl bg-[#1A1A22] px-3 py-3 text-sm font-medium text-gray-300 transition-all hover:bg-purple-600 hover:text-white"
            >
              <LogIn className="h-5 w-5 shrink-0" />
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                }`}
              >
                Log In
              </span>

              {!isExpanded && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-gray-700 shadow-xl">
                  Log In
                </div>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Auth Modal (Hidden by default, opened via Redux) */}
      <AuthModal />
    </>
  );
}

export default SideBar;