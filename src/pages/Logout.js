// src/pages/Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session, tokens, etc.
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  return null;
}

export default Logout;
