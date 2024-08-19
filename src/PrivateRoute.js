import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchData } from "./utils/apiUtils";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const { data, error } = await fetchData("/auth/validate-token");
      if (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login");
      } else {
        setIsAuthenticated(data);
      }
    };

    validateToken();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optionally render a loader or spinner here
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
