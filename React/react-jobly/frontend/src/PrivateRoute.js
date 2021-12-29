import React, { useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import UserContext from "./UserContext";

const PrivateRoute = () => {
    const { currUser } = useContext(UserContext);

    if (!currUser) {
        return <Navigate to="/login"/>;
    }

    return (
        <Outlet />
    )
}

export default PrivateRoute;