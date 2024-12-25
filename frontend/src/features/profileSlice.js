import {createAsyncThunk , createSlice} from '@reduxjs/toolkit';
import { getProfileData , putProfileData , postProfileData } from '../services/api';

// Fetch profile data
export const fetchProfileData = createAsyncThunk('profile/fetchProfileData' , async (_ ,{rejectWithValue})=>{
    try{
        const response = await getProfileData(); 
        return response ; 
    }catch(error){
        return rejectWithValue(error.response.data.message);
    }
    
});

// Create (POST) profile data
export const createProfileData = createAsyncThunk('profile/createProfileData' , async (profileData ,{rejectWithValue})=>{
    try{
        const response = await postProfileData(profileData ); 
        return response ; 
    }catch(error){
        return rejectWithValue(error.response.data.message);
    }
});

// Update (PUT) profile data
export const updateProfileData = createAsyncThunk('profile/updateProfileData' , async(profileData , {rejectWithValue})=>{
    try{
        const response = await putProfileData(profileData);
        return response;
    }catch(error){
        return rejectWithValue(error.response.data.message);
    }
});

// profileSlice
const initialState = {
    profileData : null,
    loading : false ,
    error : null ,
    success: false,
}
const profileSlice = createSlice({
    name : 'profile',
    initialState ,
    reducers : {},
    extraReducers : (builder)=>{
        builder 
            .addCase(fetchProfileData.pending , (state)=>{
                state.loading = true;
            })
            .addCase(fetchProfileData.fulfilled  , (state , action)=>{
                state.loading = false;
                state.profileData = action.payload;  
            })
            .addCase(fetchProfileData.rejected , (state , action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProfileData.pending , (state)=>{
                state.loading = true;
            })
            .addCase(createProfileData.fulfilled  , (state , action)=>{
                state.loading = false;
                state.profileData = action.payload; 
                state.success = true; 
            })
            .addCase(createProfileData.rejected , (state , action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProfileData.pending , (state)=>{
                state.loading = true;
            })
            .addCase(updateProfileData.fulfilled  , (state , action)=>{
                state.loading = false;
                state.profileData = action.payload;  
                state.success = true;
            })
            .addCase(updateProfileData.rejected , (state , action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    }
});
export default profileSlice.reducer ;

