import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";

export const createCandidature = createAsyncThunk(
  "candidature/create",
  async (candidatureData) => {
    const res = await axios.post(`/candidatures/create`, candidatureData);
    return res.data;
  }
);

export const fetchAllCandidatures = createAsyncThunk(
  "candidature/fetchAll",
  async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
  }
);

export const fetchCandidaturesByCandidat = createAsyncThunk(
  "candidature/fetchByCandidat",
  async (candidatId) => {
    const res = await axios.get(`/candidatures/candidat/${candidatId}`);
    return res.data;
  }
);

export const fetchCandidaturesByOffre = createAsyncThunk(
  "candidature/fetchByOffre",
  async (offreId) => {
    const res = await axios.get(`/candidatures/offre/${offreId}`);
    return res.data;
  }
);

const candidatureSlice = createSlice({
  name: "candidature",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCandidatures: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCandidatures.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCandidatures.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllCandidatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCandidaturesByCandidat.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchCandidaturesByOffre.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createCandidature.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export const { clearCandidatures } = candidatureSlice.actions;
export default candidatureSlice.reducer;
