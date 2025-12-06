import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"

function Layout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <SideBar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
