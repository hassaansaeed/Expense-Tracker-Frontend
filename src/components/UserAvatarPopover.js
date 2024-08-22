import React, { useState } from "react";
import { Avatar, Popover, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserAvatar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/user/logout");
  };

  var user = JSON.parse(localStorage.getItem("user"));
  const { firstName, lastName, email } = user;
  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar
        alt="User Avatar"
        sx={{ ml: 2, cursor: "pointer", bgcolor: "#111827" }}
        onClick={handleAvatarClick}
      >
        {firstName.charAt(0).toUpperCase()}
      </Avatar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {firstName} {lastName}
          </Typography>

          <Typography variant="subtitle1">{email}</Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}

export default UserAvatar;
