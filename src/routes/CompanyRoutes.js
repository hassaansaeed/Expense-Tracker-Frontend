import CreateBudget from "../pages/budget/CreateBudget";
import EditBudget from "../pages/budget/EditBudget";
import CompanyIndex from "../pages/company/CompanyIndex";
import CreateCompany from "../pages/company/CreateCompany";
import EditCompany from "../pages/company/EditCompany";

const CompanyRoutes = (allowedRoles = ["user"]) => [
  {
    path: "/user/companies",
    element: <CompanyIndex />,
    routeType: "private",
    allowedRoles,
  },
  {
    path: "/user/company/create",
    element: <CreateCompany />,
    routeType: "private",
    allowedRoles,
  },
  {
    path: "/user/company/edit/:uuid",
    element: <EditCompany />,
    routeType: "private",
    allowedRoles,
  },
];

export default CompanyRoutes;
