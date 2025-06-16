import { Navigate, Outlet } from "react-router-dom";

function UnvalidatedOnly() {
    const valid = localStorage.getItem("valid");
    const role = localStorage.getItem("role");

    const isValid = valid === "true";


    if (!isValid && role === "ROLE_CANDIDAT") {
        return <Navigate to="/CandidatForm" />;
    }
    if (!isValid && role === "ROLE_RECRUTEUR") {
        return <Navigate to="/RecruteurForm" />;
    }



    return <Outlet />;
}

export default UnvalidatedOnly;
