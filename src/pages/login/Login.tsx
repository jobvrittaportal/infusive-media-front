import React, { useState } from "react";
import { Box, Button, Flex, Grid, GridItem, Image, Input, InputGroup, InputRightElement, Link, Text, } from "@chakra-ui/react";
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
import CustomToast from "../../common/components/customToast";
import { ViewIcon } from "@chakra-ui/icons";

const Login = () => {
  const { login: loginMutation, loading } = useLogin();
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();
  const { addToast } = CustomToast();

  const { handleSubmit, control, formState: { errors } } = useForm<ILogin>({
    resolver: yupResolver(schema),
    defaultValues: emptyLoginForm,
    mode: "onBlur",
  });

  const handleForgotPassword = () => {
    navigate(routesNames.FORGOTPASSWORD);
  };

  const onSubmit = async (datas: ILogin) => {
    
    try {
      const response: any = await loginMutation(datas.email, datas.password);
      const data = response?.data?.login;

      if (data?.access_token) {
        setAuth(data.access_token, data.user);

        addToast({
          message: `Login Successful! Welcome back, ${data.user.firstName || "User"} 👋`,
          status: "success",
        });

        navigate(routesNames.DASHBOARD);
      } else {
        addToast({
          message: "Invalid credentials, please try again.",
          status: "error",
        });
      }
    } catch (err: any) {
      addToast({
        message: err?.message || "Something went wrong .",
        status: "error",
      });
      console.error("Login error:", err);
    }
  };

  return (
    <MyDiv>
      <Box>
        <Grid className="grid_container" >
          <GridItem colSpan={6}>
            <Image src={LoginImage} alt="Login Illustration" className="login-image" cursor="pointer" />
          </GridItem>

          <GridItem colSpan={6} justifyContent="center" alignContent="center">
            <Box className="login-right">
            <Box className="login-card">
              <Box className="logo-wrapper">
                <Image src={InfusiveLogo} alt="Infusive Media" className="login-logo" />
              </Box>
              <Text className='font-poppins text_semibold text_xl font_dark' mb={4} textAlign="center">Please enter your Login Details</Text>
              <Box className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Flex className="form-stack">
                    <FormInput isRequired name="email" type="string" control={control} label="Email" placeholder="Enter your email" errors={errors} />
                     <InputGroup>
                    <FormInput isRequired name="password" type="password" control={control} label="Password" placeholder="Enter password" errors={errors} />
                    {/* <Input></Input> */}
                     <InputRightElement className='eye-icon'>
                      <ViewIcon/>
                    </InputRightElement>
                    </InputGroup>
                    <Flex className="form-options" justifyContent="right">  
                      <Link onClick={handleForgotPassword} className="forgot-link" >
                        Forgot Password?
                      </Link>
                    </Flex>
                    <Button type="submit" className="login-btn" isLoading={loading} color="white">
                      Login
                    </Button>
                  </Flex>
                </form>
              </Box>
            </Box>
            </Box>
            {/* <Box pt={10} className="login-card">
              <Flex className="login-container">
                <Flex className="logo-wrapper">
                  <Image src={InfusiveLogo} alt="Infusive Media" className="login-logo" />
                </Flex>

                <Box className="welcome-section" ml={12}>
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
                      <FormInput isRequired name="password" type="password" control={control} label="Password" placeholder="Enter password" errors={errors}/>

                      <Flex className="form-options" align="center" justify="space-between" w="100%">
                        <Box className="forgot-wrapper">
                          <Link
                            onClick={handleForgotPassword}
                            className="forgot-link"
                          >
                            Forgot Password?
                          </Link>
                        </Box>
                      </Flex>

                      <Button type="submit" className="login-btn" isLoading={loading} >
                        Login
                      </Button>
                    </Flex>
                  </form>
                </Box>
              </Flex>
            </Box> */}
          </GridItem>
        </Grid>
      </Box>
    </MyDiv>
  );
};

export default Login;
