import * as yup from "yup";

export interface ILogin {
    email: string,
    password: string,
}
 
export const emptyLoginForm: any = {
    email: "",
    password: "",
};
 
export const schema = yup.object().shape({
  email : yup.string().email("Invalid email formate").required("Email is required"),
  password : yup.string().required("Password is required"),
});