// IncomeRoutes.js
import IncomeIndex from "../pages/income/IncomeIndex";
import CreateIncome from "../pages/income/CreateIncome";
import EditIncome from "../pages/income/EditIncome";

const IncomeRoutes = (allowedRoles = ["user"]) => [
  {
    path: "/user/income",
    element: <IncomeIndex />,
    routeType: "private",
    allowedRoles,
  },
  {
    path: "/user/income/create",
    element: <CreateIncome />,
    routeType: "private",
    allowedRoles,
  },
  {
    path: "/user/income/edit/:id",
    element: <EditIncome />,
    routeType: "private",
    allowedRoles,
  },
];

export default IncomeRoutes;
