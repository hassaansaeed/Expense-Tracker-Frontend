import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Report as ReportIcon,
  AttachMoney as ExpenseIcon,
  Category as CategoryIcon,
  TrendingUp as IncomeIcon,
  AccountBalanceWallet as BudgetIcon,
  LogoutOutlined as LogOutIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/user/dashboard" },
    { text: "Expenses", icon: <ExpenseIcon />, path: "/user/expenses" },
    { text: "Categories", icon: <CategoryIcon />, path: "/user/categories" },
    { text: "Income", icon: <IncomeIcon />, path: "/user/income" },
    { text: "Budget", icon: <BudgetIcon />, path: "/user/budget" },
    // { text: "Reporting", icon: <ReportIcon />, path: "/user/report" },
    { text: "Logout", icon: <LogOutIcon />, path: "/user/logout" },
  ];

  return (
    <List>
      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.path;

        return (
          <ListItem
            button
            key={index}
            onClick={() => navigate(item.path)}
            sx={{
              backgroundColor: isActive
                ? "rgba(255, 255, 255, 0.1)"
                : "inherit", // Highlight active item
              color: isActive ? "#ffca28" : "#fff", // Optionally change text/icon color
            }}
          >
            <ListItemIcon
              sx={{ color: isActive ? "#ffca28" : "#fff" }} // Optionally change icon color
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default SidebarMenu;
