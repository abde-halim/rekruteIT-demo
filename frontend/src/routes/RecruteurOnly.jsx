import { Navigate, Outlet } from "react-router-dom";

const RecruteurOnly = ({ children }) => {
    const token = localStorage.getItem("role");
    if (token !== "ROLE_RECRUTEUR") {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
};

export default RecruteurOnly;
