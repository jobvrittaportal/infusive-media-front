import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Grid, GridItem, Image, Text, VStack, InputGroup, InputRightElement, IconButton, } from "@chakra-ui/react";
import MyDiv from "./ResetPassword.style";
import LoginImage from "../../assets/images/Login-Image.svg";
import InfusiveLogo from "../../assets/images/Infusive-Logo.svg";
import * as routesNames from "../../routes/RouteConstant";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {IResetPassword,defaultPassword,resetPasswordSchema,} from "./model";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../../common/components/formElements";
import { useCallMutation } from "../../common/hooks";
import { CHANGE_PASSWORD } from "./gqlQuery/mutation";

const ForgotPassowrd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const { mutate } = useCallMutation(CHANGE_PASSWORD);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IResetPassword>({
    defaultValues: defaultPassword,
    resolver: yupResolver(resetPasswordSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data: IResetPassword) => {
    const res: any = await mutate({
      variables: {
        input: {
          userId: userId,
          newPassword: data.password,
        },
      },
    });
    if (res?.data?.changePassword) {
      navigate(routesNames.LOGIN);
    }
  };

  return (
    <MyDiv>
      <Box>
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
                  <Text className="welcome-title">Forgot Password ?</Text>
                  <Text className="welcome-subtitle font-poppins text_light text_lg">
                    Create Your New Password
                  </Text>
                </Box>

                <Box className="form-container">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack className="form-stack" spacing={4}>
                      <InputGroup>
                        <FormInput isRequired name="password" control={control} type={showPassword ? "text" : "password"} label="Password" placeholder="Enter new password" errors={errors} />
                        <InputRightElement>
                          <IconButton
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            onClick={() =>
                              setShowPassword((prev) => !prev)
                            }
                            variant="ghost"
                            size="sm"
                          />
                        </InputRightElement>
                      </InputGroup>

                      <InputGroup>
                        <FormInput isRequired name="confirmPassword" control={control} type={showConfirm ? "text" : "password"} label="Confirm Password" placeholder="Enter password again" errors={errors} />
                        <InputRightElement>
                          <IconButton
                            aria-label={
                              showConfirm ? "Hide confirm password" : "Show confirm password"
                            }
                            icon={showConfirm ? <ViewOffIcon /> : <ViewIcon />}
                            onClick={() =>
                              setShowConfirm((prev) => !prev)
                            }
                            variant="ghost"
                            size="sm"
                          />
                        </InputRightElement>
                      </InputGroup>

                      <Button type="submit" className="login-btn">
                        Save & Login
                      </Button>
                    </VStack>
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

export default ForgotPassowrd;
