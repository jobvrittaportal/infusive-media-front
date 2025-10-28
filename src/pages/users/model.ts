import * as yup from "yup";

export interface IUser{
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    altEmail?: string;
    altMobile?: string;
    password: string;
};

export const defaultUser : IUser = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    altEmail: "",
    altMobile: "",
};

export interface GetAllUsersData {
  users: IUser[];
}

export const schema = yup.object().shape({
    firstName : yup.string().required("First Name is required"),
    lastName : yup.string().required("Last Nmae is requird"),
    email : yup.string().email("Inavlid email formate").required("Email is required"),
    mobile : yup.string().required("Moblie number is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});