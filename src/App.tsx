import { Route, Routes } from "react-router-dom"

import { 
  Dashboard,
  Financial,
  Footer,
  Home,
  Inventory,
  Menu,
  SideBar, 
} from "./components"

const App = () => {

  return (
    <div className="bg-orange-500 h-screen flex flex-col justify-between">
      <div className="flex flex-row">
        <SideBar />
        <div className="container bg-sky-500">
          <Routes>
            <Route path="/" element={<Home />} index />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App