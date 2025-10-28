import { lazy } from "react";
import * as routes from "./RouteConstant";
import { withSuspense } from "./withSuspense";

const Login = lazy(() => import("../pages/login/index"));
const ForgotPassword = lazy(() => import("../pages/forgotPassowrd/index"));

export const authRoutes = [
  { path: routes.LOGIN, element: withSuspense(<Login />) },
  { path: routes.FORGOTPASSWORD, element: withSuspense(<ForgotPassword />) },
];
