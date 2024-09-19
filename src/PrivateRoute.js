import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchData } from "./utils/apiUtils";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
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
        setIsAuthenticated(true);
        setUser(JSON.parse(localStorage.getItem("user")));
      }
    };

    validateToken();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (
    isAuthenticated &&
    (allowedRoles.length === 0 || allowedRoles.includes(user?.role))
  ) {
    return children;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default PrivateRoute;
