import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {results, suggestions} from '../services/api'

export const fetchSuggestions = createAsyncThunk('serch/fetchSuggestion' , async (query , {rejectWithValue})=>{
    try{
        const response = await suggestions(query);
        return response ;
    }catch(error){
        return rejectWithValue(error.response.data.message);
    }
});

export const fetchResults = createAsyncThunk('search/fetchResults' , async({query, zipcode   , filterData ={}, page: currentPage}, {rejectWithValue})=>{
    try{
        //this because in the first time we fetch without 
        // filter so we dont sended parametre named filterData that make a problem  
        const minPrice = parseFloat(filterData?.price?.minPrice)|| 0;  
        const maxPrice = parseFloat(filterData?.price?.maxPrice) || 0;
        console.log(maxPrice);
        const response = await results(
          {
            query, 
            zipcode , 
            minPrice,  
            maxPrice,
            page: currentPage 

          });
        return response ;
    }catch(error){
        return rejectWithValue(error.response.data.message);
    }
});
const initialState = {
    loading: false,
    Suggestions :[],
    searchResults : [],
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
              // for resultof search
              .addCase(fetchResults.pending , (state)=>{
                state.loading = true;
              })
              .addCase(fetchResults.fulfilled , (state , action)=>{
                state.loading = false;
                state.searchResults = action.payload;
              })
              .addCase(fetchResults.rejected , (state , action)=>{
                state.loading = false;
                state.error = action.payload;
              })

    }
}); 
export default searchSlice.reducer ; 