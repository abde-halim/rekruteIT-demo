import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";

export const fetchRecruteurById = createAsyncThunk(
  "recruteur/fetchById",
  async (id) => {
    const response = await axios.get(`/recruteur/${id}`);
    return response.data;
  }
);

export const fetchAllRecruteur = createAsyncThunk(
  "recruteur/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const {
        pageNo = 0,
        pageSize = 10,
        sortBy = "id",
        sortDir = "asc",
      } = params;

      const res = await axios.get("/recruteurs", {
        params: { pageNo, pageSize, sortBy, sortDir },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Échec de récupération des recruteurs"
      );
    }
  }
);

export const createRecruteur = createAsyncThunk(
  "recruteur/create",
  async (recruteurData) => {
    const response = await axios.post(`/recruteur/create`, recruteurData);
    return response.data;
  }
);

export const updateRecruteur = createAsyncThunk(
  "recruteur/update",
  async ({ id, recruteurData }) => {
    const response = await axios.put(`/recruteur/${id}`, recruteurData);
    return response.data;
  }
);

export const deleteRecruteur = createAsyncThunk(
  "recruteur/delete",
  async (id) => {
    const response = await axios.delete(`/recruteur/${id}`);
    return response.data;
  }
);

const recruteurSlice = createSlice({
  name: "recruteur",
  initialState: {
    recuteurs: [],
    currentRecruteur: null,
    recruteurResponse: {
      content: [],
      pageNo: 0,
      pageSize: 10,
      totalElements: 0,
      totalPages: 0,
      last: false,
    },
    loading: false,
    error: null,
  },
  reducers: {
    setUserRecruteur: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecruteur.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRecruteur.fulfilled, (state, action) => {
        state.loading = false;
        state.recruteurResponse = action.payload;
        state.recuteurs = action.payload.content;
      })
      .addCase(fetchAllRecruteur.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRecruteurById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecruteurById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecruteur = action.payload;
      })
      .addCase(fetchRecruteurById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createRecruteur.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRecruteur.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecruteur = action.payload;
      })
      .addCase(createRecruteur.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateRecruteur.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRecruteur.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecruteur = action.payload;
      })
      .addCase(updateRecruteur.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteRecruteur.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecruteur.fulfilled, (state) => {
        state.loading = false;
        state.currentRecruteur = null;
      })
      .addCase(deleteRecruteur.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default recruteurSlice.reducer;
export const { setUserRecruteur, clearError } = recruteurSlice.actions;
