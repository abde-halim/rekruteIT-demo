import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";

export const fetchExperiences = createAsyncThunk(
  "experience/fetchExperiences",
  async (candidatId) => {
    const response = await axios.get(`/candidat/${candidatId}/experiences`);
    return response.data;
  }
);

export const createExperience = createAsyncThunk(
  "experience/createExperience",
  async ({ candidatId, experience }) => {
    const response = await axios.post(
      `/candidat/${candidatId}/experiences/create`,
      experience
    );
    return response.data;
  }
);

export const updateExperience = createAsyncThunk(
  "experience/updateExperience",
  async ({ candidateId, experienceId, experienceData }) => {
    const response = await axios.put(
      `/candidat/${candidateId}/experiences/${experienceId}`,
      experienceData
    );
    return response.data;
  }
);

export const deleteExperience = createAsyncThunk(
  "experience/delete",
  async ({ candidateId, experienceId }) => {
    const response = await axios.delete(
      `/candidat/${candidateId}/experiences/${experienceId}`
    );
    return experienceId;
  }
);

const experienceSlice = createSlice({
  name: "experience",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        const index = state.list.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.list = state.list.filter((exp) => exp.id !== action.payload);
      });
  },
});

export default experienceSlice.reducer;
