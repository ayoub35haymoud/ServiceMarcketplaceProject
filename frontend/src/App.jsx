import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ProviderDashboard from "./pages/ProviderDashboard" ; 
import CustomerDashboard from "./pages/CustomerDashboard";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/provider-dashboard" element={<ProviderDashboard/>}/>
          <Route path="customer-dashboard" element={<CustomerDashboard/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
