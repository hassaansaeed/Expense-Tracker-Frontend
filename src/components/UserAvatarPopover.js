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

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar
        alt="User Avatar"
        src="/static/images/avatar/1.jpg"
        sx={{ ml: 2, cursor: "pointer" }}
        onClick={handleAvatarClick}
      />
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
          <Typography variant="subtitle1">User Name</Typography>
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
