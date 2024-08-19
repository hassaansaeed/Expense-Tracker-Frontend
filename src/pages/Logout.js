// src/pages/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session, tokens, etc.
    localStorage.removeItem('token'); // Example: Removing auth token
    // Add any other logout logic here, such as clearing Redux state or making an API call to invalidate the token

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return null; // No need to render anything, since it's just a functional page
}

export default Logout;
