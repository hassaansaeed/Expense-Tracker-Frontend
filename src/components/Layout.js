// src/components/Layout.js
import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Badge,
  Divider,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";
import SidebarMenu from "./SidebarMenu";
import UserAvatar from "./UserAvatarPopover";

const drawerWidth = 240;

const Layout = ({ children, title = "Dashboard" }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#fff",
          color: "#000",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <UserAvatar />
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#111827",
            color: "#fff",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "#fff" }}
          >
            Expense Tracker
          </Typography>
        </Toolbar>
        <Divider />
        <Box sx={{ overflow: "auto" }}>
          <SidebarMenu />
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#f9fafb", p: 3, minHeight: "100vh" }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
