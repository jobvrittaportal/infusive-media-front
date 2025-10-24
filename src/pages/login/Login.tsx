import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Grid, GridItem, Image, Input, Link, Text, } from "@chakra-ui/react";
import MyDiv from "./login.style";
import LoginImage from '../../assets/images/Login-Image.svg';
import InfusiveLogo from "../../assets/images/Infusive-Logo.svg";
import { useNavigate } from "react-router-dom";
import * as routesNames from "../../routes/RouteConstant";

const Login = () => {
    const navigate = useNavigate();

    const handleForgotPassword = () => {
        navigate(routesNames.FORGOTPASSWORD);
    };


    return (
        <MyDiv>
            <Box >
                <Grid className="grid_container">
                    <GridItem colSpan={6}>
                        <Image src={LoginImage} alt="Login Illustration" cursor="pointer" className="login-image" />
                    </GridItem>

                    <GridItem colSpan={6}>
                        <Box pt={10}>
                            <Flex className="login-container">
                                <Flex className="logo-wrapper">
                                    <Image src={InfusiveLogo} alt="Infusive Media" className="login-logo" />
                                </Flex>

                                <Box className="welcome-section" textAlign='left'>
                                    <Text className="welcome-title">Welcome back 👋</Text>
                                    <Text className="welcome-subtitle font-poppins text_light text_lg">
                                        Sign in to your Infusive Media CRM account to<Text> continue</Text>

                                    </Text>
                                </Box>

                                {/* Form Section */}
                                <Box className="form-container">
                                    <Flex className="form-stack">
                                        <Box className="form-group">
                                            <FormControl>
                                                <FormLabel>
                                                    <Text className="form-label">Email Id</Text>
                                                    <Input placeholder="Enter your email" type="email" className="input" />
                                                </FormLabel>
                                            </FormControl>
                                        </Box>

                                        <Box>
                                            <FormControl>
                                                <FormLabel>
                                                    <Text className="form-label">Password</Text>
                                                    <Input placeholder="Enter your password" type="password" className="input" />
                                                </FormLabel>
                                            </FormControl>
                                        </Box>

                                        <Flex className="form-options" align="center" justify="space-between" w="100%" >
                                            <Box className="remember-wrapper">
                                                <Checkbox colorScheme="blue" defaultChecked> Remember me</Checkbox>
                                            </Box>

                                            <Box className="forgot-wrapper">
                                                <Link onClick={handleForgotPassword} className="forgot-link"> Forgot Password?</Link>
                                            </Box>
                                        </Flex>

                                        <Button className="login-btn" >Login </Button>
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
