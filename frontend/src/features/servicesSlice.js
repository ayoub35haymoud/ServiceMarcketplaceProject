import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {createUserService , fetchUserService , deleteUserService} from '../services/api'
//Create service
export const createService = createAsyncThunk('createService/services' ,async (serviceData , {rejectWithValue})=>{
    try{
        const response = await createUserService(serviceData);
        return response ;
    }catch(error){
        return rejectWithValue(error.response.message);
    }
});
//fetch services
export const fetchService = createAsyncThunk('fetchUserService/services' ,async (_ , {rejectWithValue})=>{
    try{
        const response = await fetchUserService();
        return response ;
    }catch(error){
        return rejectWithValue(error.response.message);
    }
});
//delete service
export const deleteService = createAsyncThunk('deleteUserService/services' ,async(_ , {rejectWithValue})=>{
    try{
        const response = await deleteUserService();
        return response ;
    }catch(error){
        return rejectWithValue(error.response.message);
    }
});
const initialState = {
    services: [],
    loading : false,
    error: null
};
const servicesSlice = createSlice({
    name : 'services',
    initialState,
    reducers: {},
    extraReducers : (builder)=>{
        builder
                // Create service
                .addCase(createService.pending, (state) => {
                    state.loading = true;
                })
                .addCase(createService.fulfilled , (state,action)=>{
                    state.loading = false,
                    state.services = action.payload;
                })
                .addCase(createService.rejected , (state , action)=>{
                    state.loading = false,
                    state.error = action.payload;
                })
                // fetch services
                .addCase(fetchUserService.pending, (state) => {
                    state.loading = true;
                })
                .addCase(fetchUserService.fulfilled , (state,action)=>{
                    state.loading = false,
                    state.services = action.payload;
                })
                .addCase(fetchUserService.rejected , (state , action)=>{
                    state.loading = false,
                    state.error = action.payload;
                })
                // delete service
                .addCase(deleteUserService.pending, (state) => {
                    state.loading = true;
                })
                .addCase(deleteUserService.fulfilled , (state,action)=>{
                    state.loading = false,
                    state.services = action.payload;
                })
                .addCase(deleteUserService.pending , (state , action)=>{
                    state.loading = false,
                    state.error = action.payload;
                })
    }
});
export default servicesSlice.reducer ;