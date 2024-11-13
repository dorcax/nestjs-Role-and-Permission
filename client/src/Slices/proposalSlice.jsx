import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  proposals: [],
  loading: false,
  error: null,
};

export const fetchProposal = createAsyncThunk(
  'fetch/proposal',
  async (jobId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      const res = await axios.get(
        `http://localhost:3000/proposal/getProposals/${jobId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      let errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

// approval endpoint

export const approveProposal = createAsyncThunk(
  'approve/proposal',
  async ({ vendorId, proposalId, isApproved }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      const res = await axios.patch(
        `http://localhost:3000/proposal/approve/${vendorId}/${proposalId}`,
        {
          isApproved,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error('Error approving proposal:', error);
      let errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

const proposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProposal.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProposal.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
        state.error = null;
      })
      .addCase(fetchProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //   approvee proposal
      .addCase(approveProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveProposal.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProposal = action.payload;
        state.proposals = state.proposals.map((proposalItem) => {
          if( proposalItem &&proposalItem.id === updatedProposal.id) {
            return updatedProposal
          } else{
            return proposalItem
          }
        });
        state.error = null;
      })
      .addCase(approveProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default proposalSlice.reducer;
