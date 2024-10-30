import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  vendor: [],
  error: null,
  loading: false,
};

//  api  to fetch all vendor

export const fetchVendors = createAsyncThunk(
  'vendor/fetchall',
  async ({ isApproved, searchTerm }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      const url =
        isApproved !== undefined
          ? `http://localhost:3000/vendor/filterVendor?isApproved=${isApproved}&searchTerm=${searchTerm}`
          : 'http://localhost:3000/vendor/vendors';
      const res = await axios.get(url, {
        headers: {
          'content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetching vendors from:', url);

      return res.data;
    } catch (error) {
      let errorMessage = error.res?.data?.message || error.message;
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
      });
  },
});
export default vendorSlice.reducer;
