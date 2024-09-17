// routes.js
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import CompanySignup from "./pages/CompanySignup";
import ExpenseRoutes from "./routes/ExpenseRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";
import IncomeRoutes from "./routes/IncomeRoutes";
import BudgetRoutes from "./routes/BudgetRoutes";
import UnauthorizedPage from "./pages/Unauthorized";
import CompanyRoutes from "./routes/CompanyRoutes";

const defaultAllowedRoles = ["admin", "user", "company"];

const routes = [
  { path: "/", element: <Login />, routeType: "public" },
  { path: "/login", element: <Login />, routeType: "public" },
  { path: "/signup", element: <Signup />, routeType: "public" },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
    routeType: "private",
  },

  { path: "/company-signup", element: <CompanySignup />, routeType: "public" },
  {
    path: "/user/logout",
    element: <Logout />,
    routeType: "private",
    allowedRoles: defaultAllowedRoles,
  },

  {
    path: "/user/dashboard",
    element: <Dashboard />,
    routeType: "private",
    allowedRoles: defaultAllowedRoles,
  },

  ...ExpenseRoutes(["user", "company", "admin"]),
  ...CategoryRoutes(["user", "company", "admin"]),
  ...IncomeRoutes(["user", "company", "admin"]),
  ...BudgetRoutes(["user", "company", "admin"]),
  ...CompanyRoutes(["admin", "company"]),

  {
    path: "/user/report",
    // element: <CreateBudget />,
    routeType: "private",
  },
];

export default routes;
