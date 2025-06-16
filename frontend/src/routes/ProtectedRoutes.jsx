import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};

export default ProtectedRoutes;
