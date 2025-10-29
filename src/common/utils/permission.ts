// Define the standard permission actions
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
    label: 'Documents',
    name: 'docs',
    permissions: ['read', 'upsert', 'delete'],
    features: [
      {
        label: 'feature1',
        name: 'docs.features1',
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
  {
    label: 'Tags',
    name: 'tag',
    permissions: ['read', 'upsert', 'delete'],
  },
  {
    label: 'Leads',
    name: 'lead',
    permissions: ['read', 'upsert', 'delete'],
  },
  {
    label: 'Queries',
    name: 'query',
    permissions: ['read', 'upsert', 'delete'],
  },
  {
    label: 'People',
    name: 'people',
    permissions: ['read', 'upsert'],
  },
  {
    label: 'Places',
    name: 'places',
    permissions: ['read', 'upsert', 'delete'],
  },
  {
    label: 'Partner',
    name: 'partner',
    permissions: ['read', 'upsert', 'delete'],
  },
  {
    label: 'Blog',
    name: 'blog',
    permissions: ['read', 'upsert', 'delete'],
  },
  {
    label: 'Society',
    name: 'society',
    permissions: ['read', 'upsert', 'delete'],
  },
];
