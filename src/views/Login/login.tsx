import React, { useState } from "react";
import { Box, Button, Flex, Grid, GridItem, IconButton, Image, Input, InputGroup, InputRightElement, Link, Text, } from "@chakra-ui/react";
import MyDiv from "./login.style";
import LoginImage from "../../assets/Images/Login-Image.svg";
import InfusiveLogo from "../../assets/Images/Infusive-Logo.svg";
import { useNavigate } from "react-router-dom";
import * as routesNames from "../../constant/routes";
import { useForm } from "react-hook-form";
import { ILoginForm, emptyLoginForm, schema } from "./model";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomButton, CustomToast, FormInput } from "../../components";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFetch } from "../../hooks/useFetch";
import { ILogin, useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, formState: { errors } } = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: emptyLoginForm,
    mode: "onBlur",
  });

  const handleForgotPassword = () => {
    navigate(routesNames.FORGOTPASSWORD);
  };

  const onSubmit = async (datas: ILoginForm) => {
    setLoading(true);
    const result = await fetchApi<ILogin>('user/login', 'POST', datas, null, 'Loggedin Successfully');
    setLoading(false);
    if (result) login(result);
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
              <Text className='font-poppins text_semibold text_xl font_dark' textAlign="left" mb={3}>Please enter your Login Details</Text>
              <Box className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Flex className="form-stack">
                    <FormInput isRequired name="email" type="string" control={control} label="Email" placeholder="Enter your email" errors={errors} />
                    <Box position="relative">
                      <InputGroup>
                        <FormInput
                          isRequired
                          name="password"
                          type={showPassword ? "text" : "password"}
                          control={control}
                          label="Password"
                          placeholder="Enter password"
                          errors={errors}
                        />
                        <InputRightElement top="31px" right="10px">
                          <IconButton
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            variant="unstyled"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </InputRightElement>
                        </InputGroup>
                      </Box>
                    <Flex className="form-options" justifyContent="right">  
                      <Link onClick={handleForgotPassword} className="forgot-link" >
                        Forgot Password?
                      </Link>
                    </Flex>
                    <CustomButton className="login-btn" type="submit" title="Submit" color="white" isLoading={loading}/>
                  </Flex>
                </form>
              </Box>
            </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </MyDiv>
  );
};

export default Login;
