export interface IUser{
  userId?: string;
  name: string
  email: string;
  mobile: string;
  roles: [];
  password?: string;
}

export const defaultUser: IUser  = {
  name: '',
  email: '',
  mobile: '',
  roles: [],
  password: '',
};
