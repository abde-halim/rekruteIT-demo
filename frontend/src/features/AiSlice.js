import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import toast from "react-hot-toast";
export const aiMatches = createAsyncThunk("Ai/matchs", async (id) => {
  const res = await axios.get(`ai/match-offre-candidats/${id}`);
  return res.data;
});
export const aiMatchesOffres = createAsyncThunk(
  "Ai/matchs-offers",
  async (id) => {
    const res = await axios.get(`ai/match-candidat-offres/${id}`);
    return res.data;
  }
);

export const AiSlice = createSlice({
  name: "AI",
  initialState: {
    data: null,
    isLoading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(aiMatches.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(aiMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        toast.success("fetching Successfully");
      })
      .addCase(aiMatches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(aiMatchesOffres.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(aiMatchesOffres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        toast.success("fetching Successfully");
      })
      .addCase(aiMatchesOffres.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default AiSlice.reducer;
