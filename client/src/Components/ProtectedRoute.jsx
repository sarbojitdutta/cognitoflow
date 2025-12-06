import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({children}) => {
    const {token} = useSelector((state)=> state.user)

    if(!token){
        toast.warn("Please Login First !", { position: "top-center" });

        localStorage.setItem("openAuthModal", "true");
        localStorage.setItem("fromProtectedRoute", "true");
        return token ? children : <Navigate to="/" />
    }
    return children
    
}
export default ProtectedRoute