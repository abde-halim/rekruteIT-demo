import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import JobListing from './components/Description/Jobdes'

import Dashboard from './pages/DashboardCandidat/CondidatDashboard';
import Profile from "./pages/DashboardCandidat/Profile";
// import History from "./pages/Dashboard/History";
// import Settings from "./pages/Dashboard/Settings";
// import Contact from "./pages/Dashboard/Contact";

import LoginPage from "./components/Signup/LoginPage";
import SignupForm from "./components/Signup/SignupForm";
import JobListPage from "./components/LandingPage/joblistpage"
import Rekruter from "./pages/Rekruter";
import JobSekkerProfile from "./pages/JobSekkerProfile";
import VerifyCode from "./components/Signup/VerifyCode";
import Application from "./pages/DashboardCandidat/Application";
import Settings from "./pages/DashboardCandidat/Settings";
import RecruteurDashboard from "./pages/DashboardRecuteur/RecruteurDashboard";
import ProfileRecruteur from "./pages/DashboardRecuteur//profile/Profile";
import Offres from "./pages/DashboardRecuteur/offre/Offres";
import Offer from "./pages/DashboardRecuteur/offre/AjouterOffre";
import Favoris from "./pages/DashboardCandidat/Favoris";
import RecruteurForm from "./pages/DashboardRecuteur/RecruteurForm";
import CandidatForm from "./pages/DashboardCandidat/condidateform";
import EditProfileRecruteur from "./pages/DashboardRecuteur/profile/EditProfileRecruteur";
import AjouterOffre from "./pages/DashboardRecuteur/offre/AjouterOffre";
import EditOffre from "./pages/DashboardRecuteur/offre/EditOffre";
import RecruteurOnly from "./routes/RecruteurOnly";
import CandidatOnly from "./routes/CandidatOnly";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import RecruteursPage from "./pages/RecruteursPage";
import RecruteurDetails from "./pages/RecruteurDetails";
import JobDetails from "./pages/JobDetails";
import UnvalidatedOnly from "./routes/UnvalidatedOnly";
import ValidatedAlready from "./routes/ValidatedAlready";
import Candidatures from "./pages/DashboardRecuteur/offre/Candidatures";
import CandidatPage from "./pages/CandidatPage";
import EditCandidat from "./pages/DashboardCandidat/profile/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<AuthRoutes />} >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/verify-code" element={<VerifyCode />} />
        </Route>
        <Route path="/rekruter" element={<Rekruter />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/JobSekkerProfile" element={<JobSekkerProfile />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<UnvalidatedOnly />}>
            <Route element={<CandidatOnly />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile/edit" element={<EditCandidat />} />
              <Route path="/application" element={<Application />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/Favoris" element={<Favoris />} />
            </Route>
            <Route element={<RecruteurOnly />}>
              <Route path="/dashboardRecruteur" element={<RecruteurDashboard />} />
              <Route path="/profileRecruteur" element={<ProfileRecruteur />} />
              <Route path="/profileRecruteur/edit" element={<EditProfileRecruteur />} />
              <Route path="/offreRecruteur" element={<Offres />} />
              <Route path="/offreRecruteur/application/:id" element={<Candidatures />} />
              <Route path="/offreRecruteur/ajouter" element={<AjouterOffre />} />
              <Route path="/offreRecruteur/:id/edit" element={<EditOffre />} />
            </Route>
          </Route>
          <Route element={<ValidatedAlready />} >
            <Route path="/RecruteurForm" element={<RecruteurForm />} />
            <Route path="/CandidatForm" element={<CandidatForm />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/offres" element={<JobListPage />} />
        <Route path="/ِcandidat/:id" element={<CandidatPage />} />
        <Route path="/offres/:id" element={<JobDetails />} />
        <Route path="/recruteurs" element={<RecruteursPage />} />
        <Route path="/recruteurs/:id" element={<RecruteurDetails />} />
        <Route path="/test" element={<JobListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
