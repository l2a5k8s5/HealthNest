import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  dashboardStats: null,
  revenueAnalytics: null,
  productAnalytics: null,
  users: [],
  totalUsers: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Get dashboard stats
export const getDashboardStats = createAsyncThunk(
  'admin/getDashboard',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get revenue analytics
export const getRevenueAnalytics = createAsyncThunk(
  'admin/getRevenue',
  async (params, thunkAPI) => {
    try {
      const { startDate, endDate, groupBy = 'day' } = params || {};
      
      let queryString = `?groupBy=${groupBy}`;
      if (startDate) queryString += `&startDate=${startDate}`;
      if (endDate) queryString += `&endDate=${endDate}`;
      
      const response = await api.get(`/admin/analytics/revenue${queryString}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get product analytics
export const getProductAnalytics = createAsyncThunk(
  'admin/getProducts',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/admin/analytics/products');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all users
export const getAllUsers = createAsyncThunk(
  'admin/getUsers',
  async (params, thunkAPI) => {
    try {
      const { page = 1, limit = 20 } = params || {};
      const response = await api.get(`/admin/users?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user status
export const updateUserStatus = createAsyncThunk(
  'admin/updateUserStatus',
  async ({ userId, isActive }, thunkAPI) => {
    try {
      const response = await api.put(`/admin/users/${userId}/status`, { isActive });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get dashboard stats
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dashboardStats = action.payload.stats;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get revenue analytics
      .addCase(getRevenueAnalytics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRevenueAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.revenueAnalytics = action.payload.analytics;
      })
      .addCase(getRevenueAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get product analytics
      .addCase(getProductAnalytics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productAnalytics = action.payload.analytics;
      })
      .addCase(getProductAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get all users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
        state.totalUsers = action.payload.total;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update user status
      .addCase(updateUserStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        // Update user in the list
        const index = state.users.findIndex(u => u._id === action.payload.user._id);
        if (index !== -1) {
          state.users[index] = action.payload.user;
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;