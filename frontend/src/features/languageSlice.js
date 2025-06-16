import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";

export const fetchLanguagesByCandidate = createAsyncThunk(
  "language/fetchByCandidate",
  async (candidateId) => {
    const res = await axios.get(`/candidat/${candidateId}/languages`);
    return res.data;
  }
);

export const fetchLanguageById = createAsyncThunk(
  "language/fetchOne",
  async ({ candidateId, languageId }) => {
    const res = await axios.get(
      `/candidat/${candidateId}/languages/${languageId}`
    );
    return res.data;
  }
);

export const createLanguage = createAsyncThunk(
  "language/create",
  async ({ candidateId, languageData }) => {
    const res = await axios.post(
      `/candidat/${candidateId}/languages/create`,
      languageData
    );
    return res.data;
  }
);

export const updateLanguage = createAsyncThunk(
  "language/update",
  async ({ candidateId, languageId, languageData }) => {
    const res = await axios.put(
      `/candidat/${candidateId}/languages/${languageId}`,
      languageData
    );
    return res.data;
  }
);

export const deleteLanguage = createAsyncThunk(
  "language/delete",
  async ({ candidateId, languageId }) => {
    await axios.delete(`/candidat/${candidateId}/languages/${languageId}`);
    return languageId;
  }
);

const languageSlice = createSlice({
  name: "language",
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentLanguage: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguagesByCandidate.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLanguagesByCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchLanguagesByCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLanguageById.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(createLanguage.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateLanguage.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (l) => l.id_langue === action.payload.id_langue
        );
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteLanguage.fulfilled, (state, action) => {
        state.list = state.list.filter((l) => l.id_langue !== action.payload);
      });
  },
});

export const { clearCurrentLanguage } = languageSlice.actions;
export default languageSlice.reducer;
