import '../styles/ProviderDashboard.css';
import { useDispatch } from "react-redux";
import {useEffect} from "react";
import {Outlet , NavLink} from "react-router-dom";
import { fetchProviderDashboard } from "../features/dashboardSlice";
import TopSectionProfile from "../components/Dashboard/TopSectionProfile";
const ProviderDashboard = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchProviderDashboard());
    },[dispatch]);

    return (
      <div className="container mt-5 ">
            <TopSectionProfile/>
            <nav className="dashboard-nav my-4  row"> 
                <NavLink to="addService" className="nav-link col-1">Services</NavLink>
                <NavLink to="about"   className=" nav-link col-1"> About  </NavLink>
            </nav>
            <Outlet />
      </div>
    );
  };
  
  export default ProviderDashboard;