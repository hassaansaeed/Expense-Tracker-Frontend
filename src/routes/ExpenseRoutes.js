// ExpenseRoutes.js
import ExpenseIndex from "../pages/expense/ExpenseIndex";
import CreateExpense from "../pages/expense/CreateExpense";
import EditExpense from "../pages/expense/EditExpense";

const ExpenseRoutes = (allowedRoles = ["admin"]) => [
  {
    path: "/user/expenses",
    element: <ExpenseIndex />,
    routeType: "private",
    allowedRoles,
  },
  {
    path: "/user/expense/create",
    element: <CreateExpense />,
    routeType: "private",
    allowedRoles,
  },
  {
    path: "/user/expense/edit/:id",
    element: <EditExpense />,
    routeType: "private",
    allowedRoles,
  },
];

export default ExpenseRoutes;
