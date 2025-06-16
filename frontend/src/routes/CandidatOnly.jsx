import { Navigate, Outlet } from "react-router-dom";

const CandidatOnly = ({ children }) => {
    const token = localStorage.getItem("role");
    if (token !== "ROLE_CANDIDAT") {
        return <Navigate to="/dashboardRecruteur" replace />;
    }
    return <Outlet />;
};

export default CandidatOnly;
