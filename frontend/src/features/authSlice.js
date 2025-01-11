import {createSlice, createAsyncThunk} from '@reduxjs/toolkit' ; 
import {loginUser , register , fetchUserData} from '../services/api';

export const userRegister = createAsyncThunk('auth/register', async(userData , {rejectWithValue})=>{
    try{
        const response = await register(userData);
        return response ; 
    }catch(error){
        return rejectWithValue(error.response.data.message);
    }
});

export const userLogin = createAsyncThunk('auth/loginUser', async(userData , {rejectWithValue})=>{
    try{
        const response = await loginUser(userData);
        return response; 
    }catch(error){
        return rejectWithValue(error.response.data.message);
    }
});
// fetch data of user and profile inside it 
export const fetchUser = createAsyncThunk('auth/fetchUser', async(_ , {rejectWithValue})=>{
    try{
        const response = await fetchUserData();
        return response; 
    }catch(error){
        return rejectWithValue(error.response.data.message);
    }
});

const initialState ={
    loading: false,
    user: null,
    token: null,
    error: null,
}
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        logout : (state)=>{
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers : (builder)=>{
        builder
               .addCase(userRegister.pending , (state)=>{
                    state.loading = true;
               })
               .addCase(userRegister.fulfilled , (state)=>{
                // why I didn't store the user and the token is because I navigate to the login to do that
                    state.loading = false;
               })
               .addCase(userRegister.rejected , (state ,action)=>{
                    state.loading = false;
                    state.error = action.payload
               })
            //    login user
               .addCase(userLogin.pending , (state)=>{
                    state.loading = true;
               })
               .addCase(userLogin.fulfilled , (state ,  action)=>{
                    state.loading = false;
                    state.token = action.payload.token;
                    localStorage.setItem('token' , action.payload.token);
               })
               .addCase(userLogin.rejected , (state, action)=>{
                    state.loading = false;
                    state.error = action.payload
               })
               //fetch user
               .addCase(fetchUser.pending , (state)=>{
                    state.loading = true;
               })
               .addCase(fetchUser.fulfilled , (state ,  action)=>{
                    state.user = action.payload.userData;
                    state.loading = false;
               })
               .addCase(fetchUser.rejected , (state, action)=>{
                    state.loading = false;
                    state.error = action.payload
               })
    }
});
export const {logout} = authSlice.actions;
export default authSlice.reducer ; 