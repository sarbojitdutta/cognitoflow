import { Routes, Route} from "react-router-dom"
import Dashboard from "../Pages/Dashboard"
import Layout from "../Components/MainLayout"
import Settings from "../Pages/Settings"
import Home from "../Pages/Home"
import CodeLab from "../Pages/CodeLab"
import ProtectedRoute from "../Components/ProtectedRoute"


function Routing(){
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home onOpenAuth={()=>setAuthOpen(true)}/>}/>
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
                    <Route path="/codelab" element={<CodeLab/>}/>                      
                    <Route path="/settings" element={<Settings/>}/>
                </Route>   
            </Routes>
        </div>
    )

}
export default Routing