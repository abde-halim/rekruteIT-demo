import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import diplomesSlice from "../features/diplomeSlice";
import candidateSlice from "../features/candidatSlice";
import candidatureSlice from "../features/candidatureSlice";
import languageSlice from "../features/languageSlice";
import offreSlice from "../features/offreSlice";
import recruteurSlice from "../features/recruteurSlice";
import experienceSlice from "../features/experienceSlice";
import AiSlice from "../features/AiSlice";
const store = configureStore({
  reducer: {
    authSlice,
    diplomesSlice,
    recruteurSlice,
    candidateSlice,
    candidatureSlice,
    languageSlice,
    offreSlice,
    experienceSlice,
    AiSlice,
  },
});
export default store;
