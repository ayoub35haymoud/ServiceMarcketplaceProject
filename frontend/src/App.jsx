import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Navbar from "./components/Navbar";
import ProviderDashboard from "./pages/ProviderDashboard" ; 
import CustomerDashboard from "./pages/CustomerDashboard";
import EditProfile from "./pages/EditProfile";
import AddService from "./components/Dashboard/AddService";
import About from "./components/Dashboard/About";
function App() {
  return (
    <>
      <Router>
         <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/customer-dashboard" element={<CustomerDashboard/>}/>
          <Route path="/provider-dashboard" element={<ProviderDashboard/>}>
              <Route path="addService" element={<AddService />} />
              <Route path="about" element={<About />} />
          </Route>
          <Route path="/edite-profile" element={<EditProfile/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
