import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
    const { token, loading } = useSelector((state) => state.user);

    // ✅ FIX: Handle side effects (Toast/LocalStorage) inside useEffect
    useEffect(() => {
        if (!loading && !token) {
            // Prevent duplicate toasts by adding a unique toastId
            toast.warn("Please Login First!", { 
                position: "top-center",
                toastId: "auth-warning" 
            });

            localStorage.setItem("openAuthModal", "true");
            localStorage.setItem("fromProtectedRoute", "true");
        }
    }, [loading, token]);

    // 1. Loading State
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#0B0B0F] text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    // 2. Redirect if no token
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // 3. Render children if authenticated
    return children;
};

export default ProtectedRoute;