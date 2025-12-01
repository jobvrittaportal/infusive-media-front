export interface IUser{
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
