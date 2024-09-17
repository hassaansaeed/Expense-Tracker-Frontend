// BudgetRoutes.js
import BudgetIndex from "../pages/budget/BudgetIndex";
import CreateBudget from "../pages/budget/CreateBudget";
import EditBudget from "../pages/budget/EditBudget";

const BudgetRoutes = (allowedRoles = ["user"]) => [
  {
    path: "/user/budget",
    element: <BudgetIndex />,
    routeType: "private",
    allowedRoles,
  },
  {
    path: "/user/budget/create",
    element: <CreateBudget />,
    routeType: "private",
    allowedRoles,
  },
  {
    path: "/user/budget/edit/:id",
    element: <EditBudget />,
    routeType: "private",
    allowedRoles,
  },
];

export default BudgetRoutes;
