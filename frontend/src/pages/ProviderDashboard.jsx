import { useDispatch } from "react-redux";
import {useEffect} from "react";
import { fetchProviderDashboard } from "../features/dashboardSlice";
import TopSectionProfile from "../components/TopSectionProfile";
const ProviderDashboard = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchProviderDashboard());
    },[dispatch]);
    return (
      <div className="container mt-5">
            <TopSectionProfile/>
      </div>
    );
  };
  
  export default ProviderDashboard;