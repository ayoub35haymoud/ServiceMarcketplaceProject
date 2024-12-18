import { useSelector , useDispatch } from "react-redux";
import React , {useEffect} from "react";
import { fetchProviderDashboard } from "../features/dashboardSlice";
const ProviderDashboard = () => {
    const dispatch = useDispatch();
    const {providerData}  = useSelector((state)=>state.dashboard)
    useEffect(()=>{
        dispatch(fetchProviderDashboard());
    },[dispatch]);
    return (
      <div className="container mt-5">
        <h1>Provider Dashboard</h1>
        <p>{providerData}</p>
      </div>
    );
  };
  
  export default ProviderDashboard;