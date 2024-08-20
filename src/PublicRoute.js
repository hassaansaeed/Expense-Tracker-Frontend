import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  return isAuthenticated ? <Navigate to="/user/dashboard" /> : children;
};

export default PublicRoute;
