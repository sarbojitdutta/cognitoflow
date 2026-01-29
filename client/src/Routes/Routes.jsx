import { Routes, Route} from "react-router-dom"
import Dashboard from "../Pages/Dashboard"
import Layout from "../Components/MainLayout"
import Settings from "../Pages/Settings"
import Home from "../Pages/Home"
import CodeLab from "../Pages/CodeLab"
import ProtectedRoute from "../Components/ProtectedRoute"
import ReviewDashboard from "../Components/reviewDashboard"
import GitConnect from "../Pages/GitConnect"


function Routing(){
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/codelab" element={<CodeLab/>}/>
                    <Route path="/connect" element={<GitConnect/>}/>                      
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/reviews" element={<ReviewDashboard/>}/>
                    <Route path="/reviews/:owner/:repo/:prNumber" element={<ReviewDashboard/>}/>
                </Route>   
            </Routes>
        </div>
    )

}
export default Routing