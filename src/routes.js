import Dashboard from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import Typography from "views/Typography/Typography.js";
import DashboardPage from "views/Dashboard/Dashboard.js";
import DashboardMesa from "views/Dashboard/DashboardMesa.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Restaurante",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    active: true,
  },
  {
    path: "/mesa/:idMesa",
    name: "Detalhes da mesa",
    icon: Dashboard,
    component: DashboardMesa,
    layout: "/admin",
    active: false,
  },
  {
    path: "/typography",
    name: "Relatórios",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
    active: true,
  },
];

export default dashboardRoutes;
