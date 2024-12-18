import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProviderDashboard, getCustomerDashboard } from '../services/api';

// Async thunk to fetch provider dashboard data
export const fetchProviderDashboard = createAsyncThunk(
  'dashboard/fetchProvider',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProviderDashboard();
      return response; 
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to fetch customer dashboard data
export const fetchCustomerDashboard = createAsyncThunk(
  'dashboard/fetchCustomer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCustomerDashboard();
      return response; 
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  providerData: null,
  customerData: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Provider Dashboard Cases
      .addCase(fetchProviderDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviderDashboard.fulfilled, (state, action) => {
        state.providerData = action.payload.message;
        state.loading = false;
      })
      .addCase(fetchProviderDashboard.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Customer Dashboard Cases
      .addCase(fetchCustomerDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerDashboard.fulfilled, (state, action) => {
        state.customerData = action.payload.message;
        state.loading = false;
      })
      .addCase(fetchCustomerDashboard.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearDashboardError } = dashboardSlice.actions;

export default dashboardSlice.reducer;
