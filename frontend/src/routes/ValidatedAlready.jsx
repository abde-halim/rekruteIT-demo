import { Navigate, Outlet } from "react-router-dom";

function ValidatedAlready() {
    const valid = localStorage.getItem("valid");
    const role = localStorage.getItem("role");

    const isValid = valid === "true";


    if (isValid) {
        return <Navigate to="/dashboard" />;
    }




    return <Outlet />;
}

export default ValidatedAlready;
