import {createSlice, createAsyncThunk} from '@reduxjs/toolkit' ; 
import {loginUser , register} from '../services/api';

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
        console.error(error.response.data);
        
        return rejectWithValue(error.response.data.message);
    }
});

const initialState ={
    user: null,
    token: null,
    loading: false,
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
               .addCase(userRegister.fulfilled , (state , action )=>{
                    state.loading = false;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    localStorage.setItem('token' , action.payload.token);

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
                    state.user = action.payload.user;
                    localStorage.setItem('user' , JSON.stringify(action.payload.user));
                    state.token = action.payload.token;
                    localStorage.setItem('token' , action.payload.token);
               })
               .addCase(userLogin.rejected , (state, action)=>{
                    state.loading = false;
                    state.error = action.payload
               })
    }
});
export const {logout} = authSlice.actions;
export default authSlice.reducer ; 