export const PermissionNames = ['read', 'upsert', 'delete'] as const;
export type PermissionAction = (typeof PermissionNames)[number];

export interface IFeatureNode {
  label: string;
  name: string;
  url?: string | null;
  permissions?: PermissionAction[];
  features?: IFeatureNode[];
}

export const FeatureTree: IFeatureNode[] = [
  {
    label: 'DashBoard',
    name: 'dashboard',
    permissions: ['read', 'upsert', 'delete'],
  },
  {
    label: 'Leads',
    name: 'leads',
    permissions: ['read', 'upsert', 'delete'],
    features: [
      {
        label: 'Lead List',
        name: 'leadList',
        permissions: ['read', 'upsert', 'delete'],
      },
      {
        label: 'Companies',
        name: 'companies',
        permissions: ['read', 'delete'],
      },
    ],
  },
];
