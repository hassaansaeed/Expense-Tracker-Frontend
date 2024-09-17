import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontWeight: "bold", fontSize: "6rem", color: "#FF3B30" }}
      >
        403
      </Typography>
      <Typography variant="h4" sx={{ mb: 2, color: "#333" }}>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
        Sorry, you don't have permission to view this page.
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          ":hover": { backgroundColor: "#1565c0" },
        }}
        onClick={handleGoBack}
      >
        Go Back to Login
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
