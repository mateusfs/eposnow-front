import Dashboard from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import Product from "views/Product/Product.js";
import Report from "views/Report/Report.js";
import DashboardPage from "views/Dashboard/Dashboard.js";
import DashboardTable from "views/Dashboard/DashboardTable.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Restaurant",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    active: true,
  },
  {
    path: "/table/:idTable",
    name: "Table details",
    icon: Dashboard,
    component: DashboardTable,
    layout: "/admin",
    active: false,
  },
  {
    path: "/product/table/:idTable",
    name: "Add product",
    icon: Dashboard,
    component: Product,
    layout: "/admin",
    active: false,
  },
  {
    path: "/product/table/:idTable/:idProduct",
    name: "Add product",
    icon: Dashboard,
    component: Product,
    layout: "/admin",
    active: false,
  },
  {
    path: "/report",
    name: "Reports",
    icon: LibraryBooks,
    component: Report,
    layout: "/admin",
    active: true,
  },
];

export default dashboardRoutes;
