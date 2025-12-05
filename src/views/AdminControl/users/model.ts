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
