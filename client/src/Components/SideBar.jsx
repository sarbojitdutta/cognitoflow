import { useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Code,
  Users,
  Settings,
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
  
  const { user } = useSelector((state) => state.user);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Code Lab", path: "/codelab", icon: Code },
    { name: "Gitconnect", path: "/connect", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div
        ref={sidebarRef}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`flex h-screen flex-col justify-between border-r border-emerald-900/30 bg-[#0a0a0a] text-gray-200 transition-all duration-300 ease-in-out ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        {/* Top Section: Logo & Nav */}
        <div>
          {/* Logo Header */}
          <div className="flex h-16 items-center gap-3 border-b border-emerald-900/30 px-5">
            {/* CF Logo */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 shadow-lg shadow-emerald-900/30 border border-emerald-500/20">
              <span className="text-lg font-black text-white tracking-tighter">CF</span>
            </div>
            
            {/* App Name */}
            <span
              className={`text-lg font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent whitespace-nowrap overflow-hidden transition-all duration-300 ${
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
                  className={`flex items-center gap-3 rounded-3xl px-3 py-3 text-sm font-medium transition-all duration-200 relative group ${
                    active
                      ? "bg-[#00ffa3] text-black shadow-lg shadow-emerald-900/30"
                      : "text-gray-500 hover:bg-[#0a110a] hover:text-gray-200 hover:border-emerald-900/20"
                  }`}
                >
                  <div className="flex items-center justify-center shrink-0">
                    <Icon className={`h-5 w-5 ${active ? "text-black" : ""}`} />
                  </div>

                  <span
                    className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                      isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                    }`}
                  >
                    {name}
                  </span>

                  {/* Tooltip (visible when collapsed) */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#0a110a] border border-emerald-900/40 text-emerald-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl shadow-black/40">
                      {name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Profile & Auth */}
        <div className="border-t border-emerald-900/30 p-3">
          
          {/* User Profile (only if logged in) */}
          {user && (
            <div
              className={`mb-3 flex items-center gap-3 rounded-xl bg-[#0a110a]/80 backdrop-blur-sm border border-emerald-900/30 p-3 transition-all duration-300 overflow-hidden ${
                isExpanded ? "opacity-100 translate-y-0" : "hidden opacity-0"
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-md shadow-emerald-900/30">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">
                  {user.username || "User"}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {user.email || "Member"}
                </p>
              </div>
            </div>
          )}

          {/* Dynamic Button: Login/Logout */}
          {user ? (
            // Logout Button
            <button
              onClick={handleLogout}
              className="group flex w-full items-center gap-3 rounded-xl border border-red-600/30 bg-red-500/10 px-3 py-3 text-sm font-medium text-red-400 transition-all hover:bg-red-600 hover:text-white hover:border-red-500 relative"
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
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-red-900 border border-red-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                  Log Out
                </div>
              )}
            </button>
          ) : (
            // Login Button
            <button
              onClick={() => dispatch(openAuth())}
              className="group flex w-full items-center gap-3 rounded-xl bg-[#0a110a] border border-emerald-900/30 px-3 py-3 text-sm font-medium text-gray-400 transition-all hover:bg-gradient-to-r hover:from-emerald-600 hover:to-green-600 hover:text-white hover:border-emerald-500/30 relative"
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
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#0a110a] border border-emerald-900/40 text-emerald-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl shadow-black/40">
                  Log In
                </div>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal />
    </>
  );
}

export default SideBar;