import { lazy } from "react";
import * as routes from "./RouteConstant";
import { withSuspense } from "./withSuspense";
import { IRouteType } from "./otherRoute";

const Login = lazy(() => import("../pages/login/index"));
const ForgotPassword = lazy(() => import("../pages/forgotPassowrd/index"));
const ResetPassword = lazy(() => import("../pages/resetPassword/index"));

export const authRoutes: IRouteType[] = [
  { path: routes.LOGIN, element: withSuspense(<Login />) },
  { path: routes.FORGOTPASSWORD, element: withSuspense(<ForgotPassword />) },
  { path: routes.RESETPASSWORD, element: withSuspense(<ResetPassword />) },
];
