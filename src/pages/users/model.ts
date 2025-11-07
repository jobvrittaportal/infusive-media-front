import { User } from "../../common/context/PermissionContext";

export interface IUser extends User {
  mobile: string;
  altEmail?: string;
  altMobile?: string;
  password?: string;
  roleIds?: string[];
}

export const defaultUser: IUser  = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  password: '',
  altEmail: '',
  altMobile: '',
  roles: []
};

export interface GetAllUsersData {
  users: IUser[];
  totalUsersCount?: number;
}


