import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Image, Input, InputGroup, InputRightElement, PinInput, PinInputField, Text, VStack, } from "@chakra-ui/react";
import MyDiv from "./forgotPassowrd.style";
import LoginImage from "../../assets/images/Login-Image.svg";
import InfusiveLogo from "../../assets/images/Infusive-Logo.svg";
import * as routesNames from "../../routes/RouteConstant";
import { useNavigate } from "react-router-dom";


const ForgotPassowrd = () => {
  const navigate = useNavigate();
const handleResetPassword = () => {
        navigate(routesNames.RESETPASSWORD);
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

              <Box className="welcome-section">
                <Text className="welcome-title" textAlign='left'>Forgot Password</Text>
                <Text className="welcome-subtitle font-poppins text_light text_lg">
                 We will send you a OTP to Create a new one                
                </Text>
              </Box>

              <Box className="form-container">
                <VStack className="form-stack">
                  <Box className="form-group">
                                    <FormControl id="email" >
                                        <FormLabel className='font-poppins text_medium text_md font_dark'>Email</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="email"
                                                className="input text_regular font-poppins text_sm font_dark"
                                                placeholder="Please Enter Your Email Id"
                                            />
                                            <InputRightElement width="fit-content" pr={3}>
                                                <Text as="button" type='button' className='opt' color="black" textDecoration="underline" cursor="pointer">
                                            "Send OTP" 
                                                </Text>
                                            </InputRightElement>
                                        </InputGroup>
                                        {/* <FormErrorMessage></FormErrorMessage> */}
                                    </FormControl>
                                </Box>

                  <Box>
                     <FormControl >
                                    <FormLabel className="font-poppins text_medium text_md font_dark">OTP</FormLabel>
                                    <Flex justifyContent="left" gap={5} className="otp_box">
                                    <PinInput  otp type="number">
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                    </Flex>
                                    {/* <FormErrorMessage></FormErrorMessage> */}
                                </FormControl>
                  </Box>

                 

                  <Button className="login-btn" onClick={handleResetPassword} > Next </Button>
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
