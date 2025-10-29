export type PermissionAction = "read" | "upsert" | "delete";

export interface IRolePermission {
  feature: string;
  permissions: Partial<Record<PermissionAction, boolean>>;
}

export interface IRole {
  id: string;
  name: string;
  active: boolean;
  permissions: IRolePermission[];
}
