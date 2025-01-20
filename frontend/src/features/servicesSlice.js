import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {createUserService , fetchUserService , deleteUserService , fetchServiceCategories , fetchUserSub_Categories} from '../services/api'
//Create service
export const createService = createAsyncThunk('services/createService' ,async (serviceData , {rejectWithValue})=>{
    try{
        const response = await createUserService(serviceData);
        return response;
    }catch(error){
        return rejectWithValue(error.response.message);
    }
});
//fetch services
export const fetchService = createAsyncThunk('services/fetchUserService' ,async (_ , {rejectWithValue})=>{
    try{
        const response = await fetchUserService();
        return response.services ;
    }catch(error){
        return rejectWithValue(error.response.message);
    }
});
//fetch fetchCategories
export const fetchCategories = createAsyncThunk('services/fetchCategories' ,async (_ , {rejectWithValue})=>{
    try{
        const response = await fetchServiceCategories();
        return response.categories ;
    }catch(error){
        return rejectWithValue(error.response.message);
    }
});
//fetch fetchsubCategories
export const fetchSub_Categories = createAsyncThunk('services/fetchSub_Categories' ,async (_ , {rejectWithValue})=>{
    try{
        const response = await fetchUserSub_Categories();
        return response.subcategories;
    }catch(error){
        return rejectWithValue(error.response.message);
    }
});
//delete service
export const deleteService = createAsyncThunk('services/deleteUserService' ,async(_ , {rejectWithValue})=>{
    try{
        const response = await deleteUserService();
        return response ;
    }catch(error){
        return rejectWithValue(error.response.message);
    }
});
const initialState = {
    services: [],
    servicesCategories: [], // This should be an empty array at the start
    sub_categories: [],
    loading: false,
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
                    state.loading = false;
                    console.log(action.payload);
                    state.services = action.payload;
                })
                .addCase(createService.rejected , (state , action)=>{
                    state.loading = false;
                    state.error = action.payload;
                })
                // fetch services
                .addCase(fetchService.pending, (state) => {
                    state.loading = true;
                })
                .addCase(fetchService.fulfilled , (state,action)=>{
                    state.loading = false;
                    state.services = action.payload;
                })
                .addCase(fetchService.rejected , (state , action)=>{
                    state.loading = false;
                    state.error = action.payload;
                })
                // delete service
                .addCase(deleteService.pending, (state) => {
                    state.loading = true;
                })
                .addCase(deleteService.fulfilled , (state,action)=>{
                    state.loading = false;
                    state.services = action.payload;
                })
                .addCase(deleteService.rejected , (state , action)=>{
                    state.loading = false;
                    state.error = action.payload;
                })
                // fetch categorie
                .addCase(fetchCategories.pending, (state) => {
                    state.loading = true;
                })
                .addCase(fetchCategories.fulfilled , (state,action)=>{
                    state.loading = false;
                    state.servicesCategories = action.payload;
                })
                .addCase(fetchCategories.rejected , (state , action)=>{
                    state.loading = false;
                    state.error = action.payload;
                })
                // fetch sub_categories
                .addCase(fetchSub_Categories.pending, (state) => {
                    state.loading = true;
                })
                .addCase(fetchSub_Categories.fulfilled , (state,action)=>{
                    state.loading = false;
                    state.sub_categories = action.payload;
                })
                .addCase(fetchSub_Categories.rejected , (state , action)=>{
                    state.loading = false;
                    state.error = action.payload;
                })
    }
});
export default servicesSlice.reducer ;