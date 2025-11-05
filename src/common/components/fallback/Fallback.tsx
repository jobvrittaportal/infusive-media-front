import { Box, Button, Flex, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import MyDiv from "./Fallback.style";
import FallbackImage from "../../../assets/images/Fallback-Image.svg"
const Fallback = () => {
  return(
    <MyDiv>
     <Flex
     direction="column"
     align="center"
     justify="center"
     textAlign="center"
     minH="100vh"
     px={4}
     >
      <Image src={FallbackImage} alt="403 Forbidden"  />

    
      <Heading as="h2"  color="gray.800" mb={2}>
        You are not authorized
      </Heading>

      <Text color="gray.600" fontSize="md"  mb={6}>
        You tried to access a page you did not have prior authorization for.
      </Text>

      <Button colorScheme="blue" borderRadius="full" >
        Go Back
      </Button>
      </Flex>
    </MyDiv>
    )
}

export default Fallback