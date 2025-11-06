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
    features: [
      {
        label: 'feature1',
        name: 'dashboard.features1',
        permissions: ['read', 'upsert', 'delete'],
      },
    ],
  },
  {
    label: 'Live Status',
    name: 'liveStatus',
    permissions: ['read', 'upsert'],
  },
  {
    label: 'Property',
    name: 'property',
    permissions: ['read', 'upsert', 'delete'],
    features: [
      {
        label: 'Property Documents',
        name: 'property.documents',
        permissions: ['read', 'upsert', 'delete'],
      },
      {
        label: 'Property Images',
        name: 'property.images',
        permissions: ['read', 'delete'],
      },
    ],
  },
  {
    label: 'Schedule',
    name: 'schedule',
    permissions: ['read', 'upsert', 'delete'],
  },
  {
    label: 'Paperwork',
    name: 'paperwork',
    permissions: ['read', 'upsert'],
  },
  
];
