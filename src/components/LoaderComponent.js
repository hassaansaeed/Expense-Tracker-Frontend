import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

const LoaderComponent = ({ show }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#111827",
        backdropFilter: "blur(5px)", // Adds a blur effect to the backdrop
      }}
      open={show}
    >
      <CircularProgress
        color="inherit"
        sx={{
          animationDuration: "550ms", // Custom animation duration
          width: 80, // Custom size
          height: 80,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          mt: 2, // Margin top
          color: "#fff",
          fontWeight: 500,
        }}
      >
        Loading, please wait...
      </Typography>
    </Backdrop>
  );
};

export default LoaderComponent;
