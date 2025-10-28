import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Image, Input, InputGroup, Text, VStack, } from "@chakra-ui/react";
import MyDiv from "./ResetPassword.style";
import LoginImage from "../../assets/images/Login-Image.svg";
import InfusiveLogo from "../../assets/images/Infusive-Logo.svg";
import * as routesNames from "../../routes/RouteConstant";
import { useNavigate } from "react-router-dom";


const ForgotPassowrd = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate(routesNames.LOGIN);
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

                                <Box className="welcome-section" >
                                    <Text className="welcome-title" textAlign='left'>Forgot Password ?</Text>
                                    <Text className="welcome-subtitle font-poppins text_light text_lg" textAlign='left'>
                                        Create Your New Password
                                    </Text>
                                </Box>

                                <Box className="form-container">
                                    <VStack className="form-stack">
                                        <Box className="form-group">
                                            <FormControl id="password" >
                                                <FormLabel className='font-poppins text_medium text_md font_dark'>Enter your Password</FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        type="password"
                                                        className="input text_regular font-poppins text_sm font_dark"
                                                        placeholder="Please Enter New Password"
                                                    />

                                                </InputGroup>

                                            </FormControl>
                                        </Box>

                                        <Box>
                                            <FormControl >
                                                <FormLabel className='font-poppins text_medium text_md font_dark'>Re-enter your Password</FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        type="password"
                                                        className="input text_regular font-poppins text_sm font_dark"
                                                        placeholder="Please Re-enter Your Password"
                                                    />

                                                </InputGroup>

                                            </FormControl>
                                        </Box>



                                        <Button className="login-btn" onClick={handleLogin}> Save & Login </Button>
                                    </VStack>
                                </Box>
                            </Flex>
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </MyDiv>
    );
};

export default ForgotPassowrd;
