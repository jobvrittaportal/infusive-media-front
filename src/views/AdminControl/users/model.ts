export interface IUser{
  userId: string;
  name: string
  email: string;
  mobile: string;
  roles: [];
  password?: string;
}

export const defaultUser: IUser  = {
  userId: '',
  name: '',
  email: '',
  mobile: '',
  roles: [],
  password: '',
};

export interface IUsersTable {
  users: IUser[];
  totalCount: number;
}

export const roleColors = [
  "#3182CE", // Blue
  "#38A169", // Green
  "#D69E2E", // Yellow
  "#E53E3E", // Red
  "#805AD5", // Purple
  "#DD6B20", // Orange
];