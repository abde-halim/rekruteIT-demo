import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";
export const fetchOffresByRecruteur = createAsyncThunk(
  "offre/fetchByRecruteur",
  async (recruteurId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/recruteur/${recruteurId}/offres`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch offres by recruteur"
      );
    }
  }
);
export const fetchAllOffres = createAsyncThunk(
  "offre/fetchAll",
  async ({ pageNo, pageSize, sortBy, sortDir }, { rejectWithValue }) => {
    try {
      const res = await axios.get("/offres", {
        params: {
          pageNo,
          pageSize,
          sortBy,
          sortDir,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch offres"
      );
    }
  }
);
export const createOffre = createAsyncThunk(
  "offre/create",
  async ({ recruteurId, offreData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/recruteur/${recruteurId}/offres/create`,
        offreData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create offre"
      );
    }
  }
);

export const updateOffre = createAsyncThunk(
  "offre/update",
  async ({ recruteurId, offreId, offreData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/recruteur/${recruteurId}/offres/${offreId}`,
        offreData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update offre"
      );
    }
  }
);

export const deleteOffre = createAsyncThunk(
  "offre/delete",
  async (offreId, { rejectWithValue }) => {
    try {
      await axios.delete(`/offres/${offreId}`);
      return offreId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete offre"
      );
    }
  }
);

export const fetchOffreById = createAsyncThunk(
  "offre/fetch",
  async (offreId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/offres/${offreId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch offre"
      );
    }
  }
);
export const fetchOffreByIdAndRecruteurId = createAsyncThunk(
  "offre/fetchOffreeee",
  async ({ recruteurId, offreId }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/recruteur/${recruteurId}/offres/${offreId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch offre"
      );
    }
  }
);

const initialState = {
  offres: [],
  currentOffre: null,
  offreResponse: {
    content: [],
    pageNo: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    last: false,
  },
  loading: false,
  error: null,
};
const offreSlice = createSlice({
  name: "offre",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentOffre: (state) => {
      state.currentOffre = null;
    },
    resetOffreState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOffres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOffres.fulfilled, (state, action) => {
        state.loading = false;
        state.offreResponse = action.payload;
        state.offres = action.payload.content;
      })
      .addCase(fetchAllOffres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOffresByRecruteur.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffresByRecruteur.fulfilled, (state, action) => {
        state.loading = false;
        state.offres = action.payload;
      })
      .addCase(fetchOffresByRecruteur.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOffreById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffreById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOffre = action.payload;
      })
      .addCase(fetchOffreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOffreByIdAndRecruteurId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffreByIdAndRecruteurId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOffre = action.payload;
      })
      .addCase(fetchOffreByIdAndRecruteurId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createOffre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOffre.fulfilled, (state, action) => {
        state.loading = false;
        state.offres.push(action.payload);
        state.offreResponse.totalElements += 1;
      })
      .addCase(createOffre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOffre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOffre.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.offres.findIndex(
          (offre) => offre.id === action.payload.id
        );
        if (index !== -1) {
          state.offres[index] = action.payload;
        }
        if (state.currentOffre?.id === action.payload.id) {
          state.currentOffre = action.payload;
        }
      })
      .addCase(updateOffre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteOffre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOffre.fulfilled, (state, action) => {
        state.loading = false;
        state.offres = state.offres.filter(
          (offre) => offre.id !== action.payload
        );
        state.offreResponse.content = state.offreResponse.content.filter(
          (offre) => offre.id !== action.payload
        );
        state.offreResponse.totalElements -= 1;
        if (state.currentOffre?.id === action.payload) {
          state.currentOffre = null;
        }
      })
      .addCase(deleteOffre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentOffre, resetOffreState } =
  offreSlice.actions;
export default offreSlice.reducer;
