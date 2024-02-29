import { Route, Routes } from "react-router-dom"

import { 
  Dashboard,
  Employees,
  Financial,
  Home,
  Inventory,
  Menu,
  Orders,
} from "./components"
import TopNavigation from "./components/TopNavigation"

const App = () => {

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex flex-row w-full">
        <TopNavigation />
        <div className="container min-h-screen bg-sub-dark text-indigo-50">
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
    </div>
  )
}

export default App