import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  vendor: [],
  statistics: {
    totalVendors: 0,
    totalUsers: 0,
    totalProposals: 0,
    totalJobs: 0,
    assignedJobs: 0,
    approvedVendors: 0,
    pendingVendors: 0,
  },
  error: null,
  loading: false,
};

//  api  to fetch all vendors

export const fetchVendors = createAsyncThunk(
  'vendor/fetchall',
  async ({ isApproved, searchTerm }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    const queryParams = new URLSearchParams();
    if (isApproved != undefined) {
      queryParams.append('isApproved', isApproved);
    }
    if (searchTerm) {
      queryParams.append('searchTerm', searchTerm);
    }
    // queryParams.toString() converts the URLSearchParams object to a query string. If there are any parameters in queryParams
    const url = queryParams.toString()
      ? `http://localhost:3000/vendor/filterVendor?${queryParams.toString()}`
      : 'http://localhost:3000/vendor/vendors';

    try {
      const res = await axios.get(url, {
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetching vendors from:', url);
      console.log('Full state:', state); //

      return res.data;
    } catch (error) {
      let errorMessage = error.res?.data?.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

// api to fetch single vendor

export const approveVendor = createAsyncThunk(
  'fetch/vendor',
  async ({ vendorId, isApproved }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      const res = await axios.patch(
        `http://localhost:3000/vendor/${vendorId}`,
        { isApproved },
        {
          headers: {
            'content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Fetching vendors from:', res.data);
      console.log('Full state:', state);
      return res.data;
    } catch (error) {
      let errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);
// api to get dashboard statistics

export const fetchStatistics = createAsyncThunk(
  'fetch/dashboard/statistics',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      const res = await axios.get('http://localhost:3000/vendor', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("statisticscccccc",res.data)
      return res.data;
    } catch (error) {
      let errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload;
        state.error = null;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // each vendor
      .addCase(approveVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveVendor.fulfilled, (state, action) => {
        state.loading = false;
        const updatedVendor = action.payload; // Should be a single vendor object

        // Ensure state.vendor remains an array and updates the correct vendor
        state.vendor = state.vendor.map((vendorItem) => {
          if (vendorItem && vendorItem.id === updatedVendor.id) {
            return updatedVendor;
          } else {
            return vendorItem;
          }
        });

        state.error = null; // Reset error
      })

      .addCase(approveVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // for dasboard  statistics
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload
        state.error = null;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default vendorSlice.reducer;
