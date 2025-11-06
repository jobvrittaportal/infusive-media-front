export interface IUser {
  id?:string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  altEmail?: string;
  altMobile?: string;
  password?: string;
  roles?: any;
  roleIds?: string[];
}

export const defaultUser: IUser = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  password: '',
  altEmail: '',
  altMobile: '',
  roles: undefined,
};

export interface GetAllUsersData {
  users: IUser[];
  totalUsersCount?: number;
}


