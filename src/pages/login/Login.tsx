import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import MyDiv from "./login.style";
import LoginImage from "../../assets/images/Login-Image.svg";
import InfusiveLogo from "../../assets/images/Infusive-Logo.svg";
import { useNavigate } from "react-router-dom";
import * as routesNames from "../../routes/RouteConstant";
import { useLogin } from "../../common/hooks/loginhook";
import { useAuth } from "../../common/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const { login: loginMutation, loading, error } = useLogin();
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleForgotPassword = () => {
    navigate(routesNames.FORGOTPASSWORD);
  };

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Missing Fields",
        description: "Email and password are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response: any = await loginMutation(email, password);
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

                {/* Form Section */}
                <Box className="form-container">
                  <Flex className="form-stack" direction="column" gap={5}>
                    <FormControl>
                      <FormLabel>
                        <Text className="form-label">Email Id</Text>
                      </FormLabel>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>
                        <Text className="form-label">Password</Text>
                      </FormLabel>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>

                    <Flex
                      className="form-options"
                      align="center"
                      justify="space-between"
                      w="100%"
                    >
                      <Checkbox
                        colorScheme="blue"
                        isChecked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      >
                        Remember me
                      </Checkbox>

                      <Link
                        onClick={handleForgotPassword}
                        className="forgot-link"
                      >
                        Forgot Password?
                      </Link>
                    </Flex>

                    <Button
                      className="login-btn"
                      colorScheme="blue"
                      onClick={handleSubmit}
                      isLoading={loading}
                      loadingText="Logging in..."
                    >
                      Login
                    </Button>

                    {error && (
                      <Text color="red.400" fontSize="sm" textAlign="center">
                        {error.message}
                      </Text>
                    )}
                  </Flex>
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
