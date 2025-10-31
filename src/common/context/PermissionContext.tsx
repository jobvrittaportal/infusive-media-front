// contexts/PermissionContext.tsx
import React, { createContext, useContext, useMemo } from 'react';
import { PermissionAction } from '../utils/permission';

interface PermissionObject {
  read: boolean | null;
  upsert: boolean | null;
  delete: boolean | null;
}

interface RolePermission {
  id: string;
  feature: string;
  permissions: PermissionObject;
}

interface Role {
  id: string;
  name: string;
  active: boolean;
  permissions: RolePermission[];
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
}

interface PermissionContextType {
  user: User | null;
  hasPermission: (feature: string, action: PermissionAction) => boolean;
  hasAnyPermission: (feature: string, actions: PermissionAction[]) => boolean;
  hasAllPermissions: (feature: string, actions: PermissionAction[]) => boolean;
  getFeaturePermissions: (feature: string) => PermissionAction[];
  canAccessFeature: (feature: string) => boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const PermissionProvider: React.FC<{ user: User | null; children: React.ReactNode }> = ({
  user,
  children,
}) => {
  // Build a permission map from all user roles
  const permissionMap = useMemo(() => {
    const map = new Map<string, Set<PermissionAction>>();

    // If no user or no roles, return empty map
    if (!user || !user.roles || user.roles.length === 0) {
      return map;
    }

    user.roles.forEach((role) => {
      // Skip inactive roles
      if (!role.active) return;

      // Skip if no permissions
      if (!role.permissions || role.permissions.length === 0) return;

      role.permissions.forEach((perm) => {
        if (!map.has(perm.feature)) {
          map.set(perm.feature, new Set());
        }

        const featurePerms = map.get(perm.feature)!;

        // Add permissions that are explicitly true (null is treated as false)
        if (perm.permissions.read === true) featurePerms.add('read');
        if (perm.permissions.upsert === true) featurePerms.add('upsert');
        if (perm.permissions.delete === true) featurePerms.add('delete');
      });
    });

    return map;
  }, [user]);

  const hasPermission = (feature: string, action: PermissionAction): boolean => {
    // If no user, deny access
    if (!user) return false;

    const featurePerms = permissionMap.get(feature);
    return featurePerms?.has(action) ?? false;
  };

  const hasAnyPermission = (feature: string, actions: PermissionAction[]): boolean => {
    return actions.some((action) => hasPermission(feature, action));
  };

  const hasAllPermissions = (feature: string, actions: PermissionAction[]): boolean => {
    return actions.every((action) => hasPermission(feature, action));
  };

  const getFeaturePermissions = (feature: string): PermissionAction[] => {
    const featurePerms = permissionMap.get(feature);
    return featurePerms ? Array.from(featurePerms) : [];
  };

  const canAccessFeature = (feature: string): boolean => {
    // A user can access a feature if they have at least one permission (read, upsert, or delete)
    return permissionMap.has(feature) && permissionMap.get(feature)!.size > 0;
  };

  return (
    <PermissionContext.Provider
      value={{
        user,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        getFeaturePermissions,
        canAccessFeature,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
};
