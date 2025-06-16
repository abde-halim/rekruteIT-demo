import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";

export const fetchDiplomesByCandidate = createAsyncThunk(
  "diploma/fetchByCandidate",
  async (candidateId) => {
    const res = await axios.get(`/candidat/${candidateId}/diplomes`);
    return res.data;
  }
);

export const fetchDiplomesById = createAsyncThunk(
  "diploma/fetchOne",
  async ({ candidateId, diplomaId }) => {
    const res = await axios.get(
      `/candidat/${candidateId}/diplomes/${diplomaId}`
    );
    return res.data;
  }
);

export const createDiplomes = createAsyncThunk(
  "diploma/create",
  async ({ candidateId, diplomaData }) => {
    const res = await axios.post(
      `/candidat/${candidateId}/diplomes/create`,
      diplomaData
    );
    return res.data;
  }
);

export const updateDiplomes = createAsyncThunk(
  "diploma/update",
  async ({ candidateId, diplomaId, diplomaData }) => {
    const res = await axios.put(
      `/candidat/${candidateId}/diplomes/${diplomaId}`,
      diplomaData
    );
    return res.data;
  }
);

export const deleteDiplomes = createAsyncThunk(
  "diploma/delete",
  async ({ candidateId, diplomaId }) => {
    await axios.delete(`/candidat/${candidateId}/diplomes/${diplomaId}`);
    return diplomaId;
  }
);

const diplomesSlice = createSlice({
  name: "diplome",
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentDiplomes: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiplomesByCandidate.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiplomesByCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDiplomesByCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDiplomesById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(createDiplomes.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateDiplomes.fulfilled, (state, action) => {
        const index = state.list.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteDiplomes.fulfilled, (state, action) => {
        state.list = state.list.filter((d) => d.id !== action.payload);
      });
  },
});

export const { clearCurrentDiplomes } = diplomesSlice.actions;

export default diplomesSlice.reducer;
