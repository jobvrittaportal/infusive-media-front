import * as yup from "yup";

export interface IResetPassword{
    password: string;
    confirmPassword: string;
};

export const defaultPassword : IResetPassword = {
    password: "",
    confirmPassword: "",
};

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});