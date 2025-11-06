import dashboardIcon from '../../../../assets/images/Home-Icon.svg';
import LeadsIcon from '../../../../assets/images/lead-Icon.svg';
import * as routesNames from '../../../../routes/RouteConstant';

type SubMenuItem = {
  id: number;
  label: string;
  link: string;
  featureKey?: string;
};
 
type MenuItem = {
  id: number;
  menuName: string;
  menuLogo: string;
  link?: string;
  subMenu?: SubMenuItem[];
  featureKey?: string;
};

export const Menus: MenuItem[] = [
  {
    id: 1,
    menuName: 'Dashboard',
    menuLogo: dashboardIcon,
    link: routesNames.DASHBOARD,
    featureKey: 'dashboard',
  },
 
  {
    id: 2,
    menuName: 'Leads',
    menuLogo: LeadsIcon,
    featureKey: 'leads',
    subMenu: [
      { id: 21, label: 'Lead List', link: routesNames.LEADLIST, featureKey: 'leadList' },
      { id: 22, label: 'Companies', link: routesNames.COMPANIES, featureKey: 'companies' },
    ],
  },
  {
    id: 3,
    menuName: 'Settings',
    menuLogo: LeadsIcon,
    subMenu: [
      { id: 31, label: 'Users', link: routesNames.USERS },
      { id: 32, label: 'Roles', link: routesNames.ROLES },
    ],
  },
];
 
 