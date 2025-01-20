import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {suggestions} from '../services/api'

export const fetchSuggestions = createAsyncThunk('serch/fetchSuggestion' , async (query , {rejectWithValue})=>{
    try{
        const response = await suggestions(query);
        return response ;
    }catch(error){
        return rejectWithValue(error.response.data.message);
    }
});

const initialState = {
    loading: false,
    Suggestions :[],
    error : null
} 
const searchSlice = createSlice({
    name : 'search',
    initialState ,
    reducers : [],
    extraReducers : (builder)=>{
        builder
            // we use just fulfilled because we dont need to loading a sppiner in the laoding
            // and also when the error comin we dont need to display it 
            // we take just the user to complete the serch 
              .addCase(fetchSuggestions.fulfilled , (state , action)=>{
                state.loading = false;
                state.Suggestions = action.payload;
              })

    }
}); 
export default searchSlice.reducer ; 