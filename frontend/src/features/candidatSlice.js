import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";

export const fetchCandidateById = createAsyncThunk(
  "candidate/fetchById",
  async (id) => {
    const response = await axios.get(`/candidat/${id}`);
    return response.data;
  }
);

export const createCandidate = createAsyncThunk(
  "candidate/create",
  async (candidateData) => {
    const response = await axios.post(`/candidat/create`, candidateData);
    return response.data;
  }
);

export const updateCandidate = createAsyncThunk(
  "candidate/update",
  async ({ id, candidateData }) => {
    const response = await axios.put(`/candidat/${id}`, candidateData);
    return response.data;
  }
);

export const deleteCandidate = createAsyncThunk(
  "candidate/delete",
  async (id) => {
    const response = await axios.delete(`/candidat/${id}`);
    return response.data;
  }
);

const candidateSlice = createSlice({
  name: "candidate",
  initialState: {
    data: null,
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    setUserCandidat: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidateById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidateById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCandidateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCandidate.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateCandidate.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteCandidate.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCandidate.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
      })
      .addCase(deleteCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default candidateSlice.reducer;
export const { setUserCandidat } = candidateSlice.actions;
