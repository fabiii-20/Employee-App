import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem("token"); // Change as per your authentication logic

    return isAuthenticated ? <Route element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
