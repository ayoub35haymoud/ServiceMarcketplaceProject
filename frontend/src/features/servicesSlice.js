import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
        createUserService ,
        fetchUserService , 
        deleteUserService , 
        fetchServiceCategories , 
        fetchUserSub_Categories ,
        fetchServiceData
    }  from '../services/api' ;
   

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
export const fetchServices = createAsyncThunk('services/fetchUserService' ,async (_ , {rejectWithValue})=>{
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

//the service clicked from the user 
export const fetchServiceById = createAsyncThunk('services/fetchService' ,async(id , {rejectWithValue})=>{
    try{
        const response = await fetchServiceData(id);
        return response ;
    }catch(error){
        return rejectWithValue(error.response.message);
    }
});

const initialState = {
    services: [],
    service : [],
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
                .addCase(fetchServices.pending, (state) => {
                    state.loading = true;
                })
                .addCase(fetchServices.fulfilled , (state,action)=>{
                    state.loading = false;
                    state.services = action.payload;
                })
                .addCase(fetchServices.rejected , (state , action)=>{
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
                // fetch service clicked
                .addCase(fetchServiceById.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(fetchServiceById.fulfilled, (state, action) => {
                    state.loading = false;
                    state.service = action.payload;
                  })
                  .addCase(fetchServiceById.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                  });
    }
});
export default servicesSlice.reducer ;