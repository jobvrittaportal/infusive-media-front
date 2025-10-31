// components/PermissionGuard.tsx
import React from 'react';
import { PermissionAction } from '../utils/permission';
import { usePermissions } from './PermissionContext';

interface PermissionGuardProps {
  feature: string;
  action: PermissionAction;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  feature,
  action,
  children,
  fallback = null,
}) => {
  const { hasPermission } = usePermissions();

  if (!hasPermission(feature, action)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

interface AnyPermissionGuardProps {
  feature: string;
  actions: PermissionAction[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AnyPermissionGuard: React.FC<AnyPermissionGuardProps> = ({
  feature,
  actions,
  children,
  fallback = null,
}) => {
  const { hasAnyPermission } = usePermissions();

  if (!hasAnyPermission(feature, actions)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
