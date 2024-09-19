import Index from "../pages/category/CategoryIndex";
import CreateCategory from "../pages/category/CreateCategory";
import EditCategory from "../pages/category/EditCategory";

const CategoryRoutes = (allowedRoles = ["admin"]) => [
  {
    path: "/user/categories",
    element: <Index />,
    routeType: "private",
    allowedRoles,
  },
  {
    path: "/user/category/create",
    element: <CreateCategory />,
    routeType: "private",
    allowedRoles,
  },
  {
    path: "/user/category/edit/:id",
    element: <EditCategory />,
    routeType: "private",
    allowedRoles,
  },
];

export default CategoryRoutes;
