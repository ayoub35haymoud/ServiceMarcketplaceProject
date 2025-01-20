import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice';
import dashboardReducer from '../features/dashboardSlice';
import profileRuducer from '../features/profileSlice';
import servicesReducer from '../features/servicesSlice';
import searchReducer from '../features/searchSlice';
 const store = configureStore({
    reducer : {
        auth : authReducer ,
        dashboard : dashboardReducer ,
        profile : profileRuducer,
        services : servicesReducer ,
        search : searchReducer
    }
 });
 export default store;