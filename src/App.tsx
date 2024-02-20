import { Route, Routes } from "react-router-dom"

import { 
  Dashboard,
  Employees,
  Financial,
  Footer,
  Home,
  Inventory,
  Menu,
  Orders,
  SideBar, 
} from "./components"

const App = () => {

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex flex-row w-full">
        <SideBar />
        <div className="container bg-indigo-100 text-indigo-800">
          <Routes>
            <Route path="/" element={<Home />} index />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App