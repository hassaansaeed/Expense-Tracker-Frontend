// routes.js
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import CreateExpense from "./pages/expense/CreateExpense";
import ExpenseIndex from "./pages/expense/ExpenseIndex";
import Index from "./pages/category/CategoryIndex";
import CreateCategory from "./pages/category/CreateCategory";
import IncomeIndex from "./pages/income/IncomeIndex";
import BudgetIndex from "./pages/budget/BudgetIndex";

const routes = [
  { path: "/", element: <Login />, routeType: "public" },
  { path: "/login", element: <Login />, routeType: "public" },
  { path: "/signup", element: <Signup />, routeType: "public" },
  { path: "/user/dashboard", element: <Dashboard />, routeType: "private" },
  { path: "/user/expenses", element: <ExpenseIndex />, routeType: "private" },
  {
    path: "/user/expense/create",
    element: <CreateExpense />,
    routeType: "private",
  },
  { path: "/user/categories", element: <Index />, routeType: "private" },
  {
    path: "/user/category/create",
    element: <CreateCategory />,
    routeType: "private",
  },
  { path: "/user/income", element: <IncomeIndex />, routeType: "private" },
  { path: "/user/budget", element: <BudgetIndex />, routeType: "private" },
  { path: "/user/logout", element: <Logout />, routeType: "public" },
];

export default routes;
