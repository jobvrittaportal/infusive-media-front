import { JSX, lazy } from 'react';
import * as routes from './RouteConstant';
import { withLayout } from './withLayout';
import { PermissionGuard } from '../common/context/PermissionGuard';
import Fallback from '../common/components/fallback';

const Dashboard = lazy(() => import('../pages/dashboard/index'));
const LeadList = lazy(() => import('../pages/leads/LeadList/index'));
const Companies = lazy(() => import('../pages/leads/Companies/index'));
const Users = lazy(() => import('../pages/users/index'));
const Profile = lazy(() => import('../pages/profile/index'));
const Roles = lazy(() => import('../pages/role/index'));
export interface IRouteType {
  path: string;
  element: JSX.Element;
}

export const otherRoutes: IRouteType[] = [
  { path: routes.DASHBOARD, element: <PermissionGuard feature={'dashboard'} action={'read'} children={withLayout(<Dashboard />)} fallback={withLayout(<Fallback/>)}/>  },
  { path: routes.LEADLIST, element: withLayout(<LeadList />) },
  { path: routes.COMPANIES, element: withLayout(<Companies />) },
  { path: routes.USERS, element: withLayout(<Users />) },
  { path: routes.PROFILE, element: withLayout(<Profile />) },
  { path: routes.ROLES, element: withLayout(<Roles />) },
];
