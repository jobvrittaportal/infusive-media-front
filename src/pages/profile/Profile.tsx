import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  Badge,
  GridItem,
  Image,
} from "@chakra-ui/react";
import MyDiv from "./Profile.style";
import ProfileImage from '../../assets/images/profileImage.svg'
import BackgroundImage from '../../assets/images/backgroundImage.jpg'
import { EditIcon } from "@chakra-ui/icons";

const Profile = () => {
  return (
    <MyDiv>
      <Box className="container">
        <Heading as="h2" size="md" mb={6} className="title">
          My Profile
        </Heading>
         
           <Box className="profile-container">
        <Box className="cover-wrapper">
          <Image src={BackgroundImage} alt="cover" className="cover-image" />
        </Box>
        <Box className="content-section">
           <Grid className="grid_gap_sm grid_container" gap={4}>
            <GridItem colSpan={2}>
            
              <Avatar size="2xl" src={ProfileImage} className="avatar" />
              </GridItem>
             <GridItem colSpan={10}>
                <Flex justify="space-between" align="center">
              <Box>
                <Heading as="h3" size="md" mb={1}>
                  Radhika Nayak
                </Heading>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  Admin
                </Text>
                <Text fontSize="md" color="gray.500" mb={1}>
                  Bhubaneswar, Odisha
                </Text>
              </Box>
               <Button
              size="sm"
              leftIcon={<EditIcon />}
              variant="outline"
              colorScheme="gray"
            >
              Edit Profile
            </Button>
            </Flex>
           </GridItem>

            
           
        </Grid>
        </Box>
        
      </Box>

        
        {/* <Box className="card">
          <Flex align="center" gap={6}>
            <Avatar
              size="xl"
              src={ProfileImage}
            />
            <Box flex="1">
              <Flex align="center" justify="space-between">
                <Box>
                  <Heading as="h3" size="md">
                    Radhika Nayak
                  </Heading>
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    Admin
                  </Text>
                  <Text fontSize="sm" color="gray.600" mt={2}>
                    Bhubaneswar, Odisha
                  </Text>
                </Box>
                
              </Flex>
            </Box>
          </Flex>
        </Box> */}

       
        <Box className="section" mt={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading as="h4" size="sm" color="#002795">
              Personal Information
            </Heading>
            <Button size="sm" bg="#0052CC" variant="solid" color="white">
                    <EditIcon mr={2} color="white"/>
                  Edit
                </Button>
          </Flex>

          <Grid className="grid_gap_sm grid_container" gap={4}>
            <GridItem colSpan={2}>
              <Text className="label">Full Name</Text>
              <Text>Radhika Nayak</Text>
        </GridItem>
         <GridItem colSpan={2}>
              <Text className="label">Date of Birth</Text>
              <Text>11-02-1999</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text className="label">Email Address</Text>
              <Text>radhika@gmail.com</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text className="label">Phone Number</Text>
              <Text>+91 987 654 4327</Text>
              </GridItem>
            <GridItem colSpan={2}>
              <Text className="label">User Role</Text>
              <Badge colorScheme="green">Admin</Badge>
            </GridItem>
          </Grid>
        </Box>

       
        <Box className="section">
          <Flex justify="space-between" align="center" mb={4}>
            <Heading as="h4" size="sm" color="#002795">
              Address
            </Heading>
            <Button size="sm" bg="#0052CC" variant="solid" color="white">
                    <EditIcon mr={2} color="white"/>
                  Edit
                </Button>
          </Flex>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
            <Box>
              <Text className="label">Country</Text>
              <Text>India</Text>
            </Box>
            <Box>
              <Text className="label">City</Text>
              <Text>Bhubaneswar, odisha</Text>
            </Box>
            <Box>
              <Text className="label">Postal Code</Text>
              <Text>700855</Text>
            </Box>
          </Grid>
        </Box>
      </Box>
    </MyDiv>
  );
};

export default Profile;
