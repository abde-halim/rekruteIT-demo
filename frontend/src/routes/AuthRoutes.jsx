import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const role = localStorage.getItem("role");
        if (role in ["ROLE_RECRUTEUR", "ROLE_RECRUTEUR"]) {
            return <Navigate to="/dashboardRecruteur" replace />;
        }
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default AuthRoutes;
