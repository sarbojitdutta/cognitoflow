import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Code,
  Users,
  Settings,
  Workflow,
  Menu,
  User,
  LogIn,
  LogOut,
  Phone,
  AlertTriangle,
  Home as HomeIcon,
} from "lucide-react";
import AuthModal from "./AuthModal";
import { logout } from "../Redux/Slices/userSlice";
import { openAuth } from "../Redux/Slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";

function SideBar() {
  const location = useLocation();
  const [openMore, setOpenMore] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Check if we should open auth modal (e.g., from protected route)
    const shouldOpenModal = localStorage.getItem("openAuthModal");
    const fromProtected = localStorage.getItem("fromProtectedRoute");

    if (shouldOpenModal && fromProtected === "true") {
      dispatch(openAuth());
      localStorage.removeItem("openAuthModal");
      localStorage.removeItem("fromProtectedRoute");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Code Reviewer", path: "/codereview", icon: Code },
    { name: "Live Collaboration", path: "/collaboration", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      <div className="flex h-screen w-64 flex-col justify-between border-r border-gray-700 bg-[#0B0B0F] text-gray-200">
        {/* Logo and Nav */}
        <div>
          <div className="flex h-16 items-center gap-2 border-b border-gray-700 px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
              <Workflow className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              CognitoFlow
            </span>
          </div>

          <nav className="mt-6 space-y-1 px-4">
            {navItems.map(({ name, path, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                      : "text-gray-400 hover:bg-[#1A1A22] hover:text-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* More Options */}
        <div className="relative border-t border-gray-700 p-4" ref={dropdownRef}>
          <button
            onClick={() => setOpenMore(!openMore)}
            className="flex items-center gap-3 w-full rounded-lg bg-[#14141A] p-3 text-sm font-medium text-gray-300 hover:bg-[#1A1A22] transition-all duration-200"
          >
            <Menu className="h-5 w-5" />
            <span>More</span>
          </button>

          {openMore && (
            <div className="absolute bottom-16 left-4 w-60 rounded-xl border border-gray-700 bg-[#14141A]/90 backdrop-blur-lg shadow-2xl animate-slide-up z-50">
              <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{user?.username || "Guest"}</p>
                </div>
              </div>

              <div className="flex flex-col text-sm">
                {!user ? (
                  <button
                    onClick={() => {
                      dispatch(openAuth());
                      setOpenMore(false);
                    }}
                    className="flex items-center gap-2 px-4 py-3 text-left hover:bg-[#1A1A22] transition-all"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In / Sign Up
                  </button>
                ) : null}

                <button className="flex items-center gap-2 px-4 py-3 text-left hover:bg-[#1A1A22] transition-all">
                  <Phone className="h-4 w-4" />
                  Contact Us
                </button>

                <button className="flex items-center gap-2 px-4 py-3 text-left hover:bg-[#1A1A22] transition-all">
                  <AlertTriangle className="h-4 w-4" />
                  Report a Problem
                </button>

                {user && (
                  <button
                    onClick={() => {
                      dispatch(logout());
                      setOpenMore(false);
                      navigate("/");
                    }}
                    className="flex items-center gap-2 px-4 py-3 text-left hover:bg-[#1A1A22] transition-all"
                  >
                    <LogOut className="h-4 w-4 rotate-180" />
                    Log Out
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <AuthModal />
    </>
  );
}

export default SideBar;
