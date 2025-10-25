import React, { useState } from "react";
import { Box, Button, Flex, Grid, GridItem, Image, Link, Text, useToast, } from "@chakra-ui/react";
import MyDiv from "./login.style";
import LoginImage from "../../assets/images/Login-Image.svg";
import InfusiveLogo from "../../assets/images/Infusive-Logo.svg";
import { useNavigate } from "react-router-dom";
import * as routesNames from "../../routes/RouteConstant";
import { useLogin } from "../../common/hooks/loginhook";
import { useAuth } from "../../common/context/AuthContext";
import { FormInput } from "../../common/components/formElements";
import { useForm } from "react-hook-form";
import { ILogin, emptyLoginForm, schema } from "./model";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
    const [rememberMe, setRememberMe] = useState(true);
    const { login: loginMutation, loading, error } = useLogin();
    const { login: setAuth } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const { handleSubmit, control, formState: { errors } } = useForm<ILogin>({
        resolver: yupResolver(schema),
        defaultValues: emptyLoginForm,
        mode: "onBlur",
    });

    const handleForgotPassword = () => {
        navigate(routesNames.FORGOTPASSWORD);
    };

    const onSubmit = async (datas : ILogin) => {
        try {
            const response: any = await loginMutation(datas.email, datas.password);
            const data = response?.data?.login;

            if (data?.access_token) {
                setAuth(data.access_token, data.user);

                toast({
                    title: "Login Successful",
                    description: `Welcome back, ${data.user.firstName || "User"}!`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                navigate(routesNames.DASHBOARD);
            } else {
                toast({
                    title: "Login Failed",
                    description: "Invalid credentials, please try again.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (err: any) {
            toast({
                title: "Error Logging In",
                description: err?.message || "Something went wrong.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.error("Login error:", err);
        }
    };

    return (
        <MyDiv>
            <Box>
                <Grid className="grid_container">
                    <GridItem colSpan={6}>
                        <Image
                            src={LoginImage}
                            alt="Login Illustration"
                            className="login-image"
                            cursor="pointer"
                        />
                    </GridItem>

                    <GridItem colSpan={6}>
                        <Box pt={10}>
                            <Flex className="login-container">
                                <Flex className="logo-wrapper">
                                    <Image
                                        src={InfusiveLogo}
                                        alt="Infusive Media"
                                        className="login-logo"
                                    />
                                </Flex>

                                <Box className="welcome-section" textAlign="left">
                                    <Text className="welcome-title">Welcome back 👋</Text>
                                    <Text className="welcome-subtitle font-poppins text_light text_lg">
                                        Sign in to your Infusive Media CRM account to
                                        <Text as="span"> continue</Text>
                                    </Text>
                                </Box>

                                <Box className="form-container">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Flex className="form-stack">

                                            <FormInput isRequired name="email" type="string" control={control} label="Email" placeholder="Enter your email" errors={errors} />
                                            <FormInput isRequired name="password" type="string" control={control} label="Password" placeholder="Enter password" errors={errors} />

                                            <Flex className="form-options" align="center" justify="space-between" w="100%" >
                                                {/* <Box className="remember-wrapper">
                                                        <Checkbox colorScheme="blue" defaultChecked> Remember me</Checkbox>
                                                    </Box> */}

                                                <Box className="forgot-wrapper">
                                                    <Link onClick={handleForgotPassword} className="forgot-link"> Forgot Password?</Link>
                                                </Box>
                                            </Flex>

                                            <Button type="submit" className="login-btn" >Login </Button>
                                        </Flex>
                                    </form>
                                </Box>
                            </Flex>
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </MyDiv>
    );
};

export default Login;
