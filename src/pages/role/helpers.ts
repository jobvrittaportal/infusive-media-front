import { read } from 'fs';
import { features } from 'process';
import * as yup from 'yup';

export type PermissionAction = "read" | "upsert" | "delete";

export interface IRolePermission {
  feature: string;
  permissions: Partial<Record<PermissionAction, boolean>>;
}

export interface IRole {
  id?: string;
  name: string;
  active: boolean;
  permissions?: IRolePermission[];
};

export const defaultIRole: IRole ={
  id: "",
  name: "",
  active: true,
  permissions: [],
};

export const schema = yup.object().shape({
  name: yup.string().required("Role name is required"),
  active: yup.boolean().required(),
 /*  permissions: yup.array().of(
    yup.object().shape({
      features: yup.string().required(),
      permissions: yup.object().shape({
        read: yup.boolean(),
        upsert: yup.boolean(),
        delete: yup.boolean(),
      })
    })
  ) */
});