import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchCandidateById, setUserCandidat } from "./candidatSlice";
import { fetchRecruteurById, setUserRecruteur } from "./recruteurSlice";
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ data, Navigate }) => {
    const res = await axios.post("auth/signup", data);
    if (res.status == 200) {
      Navigate("/login");
    } else {
      alert(data.message || "Erreur de connexion");
    }
    return res.data;
  }
);
export const login = createAsyncThunk(
  "auth/signin",
  async ({ data, Navigate }) => {
    const res = await axios.post("auth/signin", data);
    if (res.status == 200) {
      localStorage.setItem("email", data.usernameOrEmail);
      Navigate("/verify-code");
    } else {
      alert(data.message || "Erreur de connexion");
    }
    return res.data;
  }
);
export const verifyCode = createAsyncThunk(
  "auth/VerifyCode",
  async ({ data, Navigate, dispatch }) => {
    const res = await axios.post("auth/verify-code", data);
    if (res.status == 200) {
      localStorage.removeItem("email");
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("id", res.data.userId);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("valid", false);
      if (localStorage.getItem("role") == "ROLE_CANDIDAT") {
        try {
          await dispatch(fetchCandidateById(res.data.userId));
          await localStorage.setItem("valid", "true");
        } catch (e) {
          localStorage.setItem("valid", "false");
        }
        Navigate("/dashboard");
      } else if (localStorage.getItem("role") == "ROLE_RECRUTEUR") {
        try {
          const result = await dispatch(fetchRecruteurById(res.data.userId));
          await localStorage.setItem("valid", "true");
        } catch (e) {
          localStorage.setItem("valid", "false");
        }
        Navigate("/dashboardRecruteur");
      } else {
        Navigate("/");
      }
    } else {
      alert(data.message || "Erreur de connexion");
    }
    return res.data;
  }
);
export const profileUpdate = createAsyncThunk(
  "auth/profile-update",
  async (data) => {
    const res = await axios.put("auth/profile-update", data);
    return res.data;
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningup: false,
    isLogging: false,
    isUpdatingProfile: false,
    isVerifyingProfile: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLogging = true;
      })
      .addCase(login.fulfilled, (state, payload) => {
        state.isLogging = true;
        state.authUser = payload;
        toast.success("Login Successfully");
      })
      .addCase(login.rejected, (state) => {
        state.isLogging = false;
        toast.error("Login Failed");
      })
      .addCase(signup.pending, (state) => {
        state.isSigningup = true;
      })
      .addCase(signup.fulfilled, (state, payload) => {
        state.isSigningup = true;
        state.authUser = payload;
        toast.success("Signup Successfully");
      })
      .addCase(signup.rejected, (state, payload) => {
        state.isSigningup = false;
        toast.error(payload.error.message);
        toast.success("Signup failed");
      })
      .addCase(verifyCode.pending, (state) => {
        state.isVerifyingProfile = true;
      })
      .addCase(verifyCode.fulfilled, (state, payload) => {
        state.isVerifyingProfile = true;
        state.authUser = payload;
        toast.success("verifyCode Successfully");
      })
      .addCase(verifyCode.rejected, (state, payload) => {
        state.isVerifyingProfile = false;
        toast.error(payload.error.message);
        toast.success("verifyCode failed");
      });
  },
});

export default authSlice.reducer;
