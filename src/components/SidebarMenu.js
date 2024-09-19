import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AttachMoney as ExpenseIcon,
  Category as CategoryIcon,
  TrendingUp as IncomeIcon,
  AccountBalanceWallet as BudgetIcon,
  LogoutOutlined as LogOutIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user from localStorage (which was set after authentication)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/user/dashboard",
      allowedRoles: ["admin", "user", "company"],
    },
    {
      text: "Companies",
      icon: <BusinessIcon />,
      path: "/user/companies",
      allowedRoles: ["admin", "company"],
    },
    {
      text: "Expenses",
      icon: <ExpenseIcon />,
      path: "/user/expenses",
      allowedRoles: ["admin", "user", "company"],
    },
    {
      text: "Categories",
      icon: <CategoryIcon />,
      path: "/user/categories",
      allowedRoles: ["admin", "user", "company"],
    },
    {
      text: "Income",
      icon: <IncomeIcon />,
      path: "/user/income",
      allowedRoles: ["admin", "user", "company"],
    },
    {
      text: "Budget",
      icon: <BudgetIcon />,
      path: "/user/budget",
      allowedRoles: ["admin", "user", "company"],
    },
    {
      text: "Logout",
      icon: <LogOutIcon />,
      path: "/user/logout",
      allowedRoles: ["admin", "user", "company"],
    },
  ];

  // Function to check if the user's role matches any allowedRoles for the menu item
  const hasAccess = (allowedRoles) => {
    return user && allowedRoles.includes(user.role);
  };

  return (
    <List>
      {menuItems.map((item, index) => {
        // Only show the menu item if the user has access based on their role
        if (!hasAccess(item.allowedRoles)) {
          return null;
        }

        const isActive = location.pathname === item.path;

        return (
          <ListItem
            button
            key={index}
            onClick={() => navigate(item.path)}
            sx={{
              backgroundColor: isActive
                ? "rgba(255, 255, 255, 0.1)"
                : "inherit",
              color: isActive ? "#ffca28" : "#fff",
            }}
          >
            <ListItemIcon sx={{ color: isActive ? "#ffca28" : "#fff" }}>
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
