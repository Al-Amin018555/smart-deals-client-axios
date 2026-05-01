import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const ProtectedRoutes = ({ children }) => {
    const { user } = use(AuthContext);

    const location = useLocation();
    console.log(location);

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={location.pathname}></Navigate>

};

export default ProtectedRoutes;