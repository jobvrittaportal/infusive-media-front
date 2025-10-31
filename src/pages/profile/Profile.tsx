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
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalContent,
  IconButton,
} from "@chakra-ui/react";
import MyDiv from "./Profile.style";
import ProfileImage from "../../assets/images/profileImage.svg";
import BackgroundImage from "../../assets/images/backgroundImage.jpg";
import { EditIcon } from "@chakra-ui/icons";
import { EditProfileCard } from "./components";
import { useRef, useState } from "react";

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgInputRef = useRef<HTMLInputElement | null>(null);
  const profileInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Store image state
  const [backgroundImage, setBackgroundImage] = useState(BackgroundImage);
  const [profileImage, setProfileImage] = useState(ProfileImage);

  // ✅ Handle uploads and preview instantly
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "background" | "profile"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === "background") setBackgroundImage(imageUrl);
      else setProfileImage(imageUrl);
    }
  };

  return (
    <MyDiv>
      <Box className="container">
        <Heading as="h2" size="md" mb={6} className="title">
          My Profile
        </Heading>
        <Box className="profile-container">
          <Box className="cover-wrapper" position="relative">
            <Image
              src={backgroundImage} 
              alt="cover"
              className="cover-image"
              w="100%"
              h="200px"
              objectFit="cover"
            />
            <IconButton
              aria-label="Edit background"
              icon={<EditIcon />}
              size="sm"
              bg="#0052CC"
              color="white"
              position="absolute"
              top={3}
              right={3}
              _hover={{ bg: "#003c99" }}
              onClick={() => bgInputRef.current?.click()}
            />
            <input
              type="file"
              ref={bgInputRef}
              accept="image/*"
              hidden
              onChange={(e) => handleImageUpload(e, "background")}
            />
          </Box>

          <Box className="content-section" position="relative">
            <Grid className="grid_gap_sm grid_container" gap={4}>
              <GridItem colSpan={2} >
                <Avatar size="2xl" src={profileImage}  className="avatar" border="4px solid white"/>
                <IconButton
                  aria-label="Edit profile"
                  icon={<EditIcon />}
                  size="xs"
                  bg="#0052CC"
                  color="white"
                  position="absolute"
                  bottom={6}
                  right={1230}
                  borderRadius="full"
                  _hover={{ bg: "#003c99" }}
                  onClick={() => profileInputRef.current?.click()}
                />
                <input type="file" ref={profileInputRef} accept="image/*" hidden onChange={(e) => handleImageUpload(e, "profile")} />
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
                  {/* <Button
                    size="sm"
                    leftIcon={<EditIcon />}
                    variant="outline"
                    colorScheme="gray"
                    onClick={onOpen}
                  >
                    Edit Profile
                  </Button> */}
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </Box>

        <Box className="section" mt={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading as="h4" size="sm" color="#002795">
              Personal Information
            </Heading>
            <Button size="sm" bg="#0052CC" color="white" _hover={{ bg: "#003c99" }} onClick={onOpen}>
              <EditIcon mr={2} color="white" />
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
            <Button size="sm" bg="#0052CC" color="white" _hover={{ bg: "#003c99" }}>
              <EditIcon mr={2} color="white" />
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
              <Text>Bhubaneswar, Odisha</Text>
            </Box>
            <Box>
              <Text className="label">Postal Code</Text>
              <Text>700855</Text>
            </Box>
          </Grid>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <EditProfileCard />
          </ModalBody>
        </ModalContent>
      </Modal>
    </MyDiv>
  );
};

export default Profile;
