import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Image, Input, PinInput, PinInputField, Text, VStack, } from "@chakra-ui/react";
import MyDiv from "./forgotPassowrd.style";
import LoginImage from "../../assets/Images/Login-Image.svg";
import InfusiveLogo from "../../assets/Images/Infusive-Logo.svg";


const ForgotPassowrd = () => {
 

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
                    <FormControl>
                      <FormLabel className="font-poppins text_medium text_md font_dark">Email Id</FormLabel>
                        <Input placeholder="Enter your email" type="email" className="input" />
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

                 

                  <Button className="login-btn" > Next </Button>
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
