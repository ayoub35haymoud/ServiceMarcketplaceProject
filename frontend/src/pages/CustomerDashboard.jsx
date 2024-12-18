import { useSelector , useDispatch } from "react-redux";
import React , {useEffect} from "react";
import {fetchCustomerDashboard } from "../features/dashboardSlice";
const CustomerDashboard = () => {
    const dispatch = useDispatch();
    const {customerData}  = useSelector((state)=>state.dashboard)
    useEffect(()=>{
        dispatch(fetchCustomerDashboard());
    },[dispatch]);
    return (
      <div className="container mt-5">
        <h1>Customer Dashboard</h1>
        <p>{customerData}</p>
      </div>
    );
  };
  
  export default CustomerDashboard;
  
