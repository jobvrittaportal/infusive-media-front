import { JSX, lazy } from "react";
import * as routes from "./RouteConstant";
import { withLayout } from "./withLayout";
import { elements } from "chart.js";

const Dashboard = lazy(() => import("../pages/dashboard/index"));
const LeadList = lazy(() => import("../pages/leads/LeadList/index"));
const Users = lazy(() => import("../pages/users/index"))
export interface IRouteType {
  path: string;
  element: JSX.Element;
}

export const otherRoutes:IRouteType[] = [
  { path: routes.DASHBOARD, element: withLayout(<Dashboard />) },
  { path: routes.LEADLIST, element: withLayout(<LeadList />) },
  { path: routes.USERS, element: withLayout(<Users/>) }
];
