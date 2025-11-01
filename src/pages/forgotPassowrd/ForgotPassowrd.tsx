import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Image, Input, InputGroup, InputRightElement, PinInput, PinInputField, Text, VStack, useToast,} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyDiv from "./forgotPassowrd.style";
import LoginImage from "../../assets/images/Login-Image.svg";
import InfusiveLogo from "../../assets/images/Infusive-Logo.svg";
import * as routesNames from "../../routes/RouteConstant";
import { useFetch } from "../../common/api/fetch/Fetch";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const { fetchApi, loading } = useFetch(({ status, message }) =>
    toast({
      title: status === "success" ? "Success" : "Error",
      description: message,
      status,
      duration: 3000,
      isClosable: true,
    })
  );

  // Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const res = await fetchApi( "otp/send", "POST", { email }, null, "OTP sent successfully! Please check your email.");
    if(res){
      toast({
        title: "OTP Sent!",
        description: "OTP sent successfully! Please check your email.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!email || !otp) {
      toast({
        title: "Missing Fields",
        description: "Please enter both email and OTP.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const result:any = await fetchApi( "otp/verify", "POST", { email, otp }, null, "", false);
    if (result) {
      toast({
        title: "OTP Verified!",
        description: "You can now reset your password.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(routesNames.RESETPASSWORD, {
        state: {userId : result?.userId}
      });
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please check the OTP and try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <MyDiv>
      <Box>
        <Grid className="grid_container">
          <GridItem colSpan={6}>
            <Image src={LoginImage} alt="Login Illustration" className="login-image" />
          </GridItem>

          <GridItem colSpan={6} justifyContent="center" alignContent="center">
            <Box className="login-right">
            <Box className="login-card">
               <Box className="logo-wrapper">
              <Flex className="login-container">
                <Flex className="logo-wrapper">
                  <Image src={InfusiveLogo} alt="Infusive Media" className="login-logo" />
                </Flex>
                
                <Box className="form-container">
                  <VStack className="form-stack">
                    <FormControl id="email">
                      <FormLabel>Email</FormLabel>
                      <InputGroup>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputRightElement width="fit-content" pr={3}>
                          <Text
                            as="button"
                            onClick={handleSendOtp}
                            disabled={loading}
                            textDecoration="underline"
                            cursor="pointer"
                          >
                            {loading ? "Sending..." : "Send OTP"}
                          </Text>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel>OTP</FormLabel>
                      <Flex justifyContent="left" gap={5}>
                        <PinInput otp type="number" onChange={(value) => setOtp(value)}>
                          {[...Array(6)].map((_, i) => (
                            <PinInputField key={i} />
                          ))}
                        </PinInput>
                      </Flex>
                    </FormControl>

                    <Button
                      className="login-btn"
                      onClick={handleVerifyOtp}
                      isLoading={loading}
                    >
                      Verify OTP
                    </Button>
                  </VStack>
                </Box>
              </Flex>
            </Box>
            </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </MyDiv>
  );
};

export default ForgotPassword;