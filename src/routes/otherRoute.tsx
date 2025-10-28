import { lazy } from "react";
import * as routes from "./RouteConstant";
import { withLayout } from "./withLayout";

const Dashboard = lazy(() => import("../pages/dashboard/index"));
const LeadList = lazy(() => import("../pages/leads/LeadList/index"));

export const otherRoutes = [
  { path: routes.DASHBOARD, element: withLayout(<Dashboard />) },
  { path: routes.LEADLIST, element: withLayout(<LeadList />) },
];
