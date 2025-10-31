import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Image,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import MyDiv from "./EditProfileCard.style";
import ProfileImage from '../../../../assets/images/profileImage.svg'
import BackgroundImage from '../../../../assets/images/backgroundImage.jpg'

const EditProfileCard = () => {
  const bgInputRef = useRef<HTMLInputElement | null>(null);
  const profileInputRef = useRef<HTMLInputElement | null>(null);

  const [backgroundImage, setBackgroundImage] = useState(
     BackgroundImage
  );
  const [profileImage, setProfileImage] = useState(
    ProfileImage
  );
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "background" | "profile"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      type === "background"
        ? setBackgroundImage(imageUrl)
        : setProfileImage(imageUrl);
    }
  };

  return (
    <MyDiv>
      <Box >
        <Text className="font-poppins font_dark text_semibold text_lg mb-3" align="center">
          Personal Information
        </Text>

        <Box mt={4}>
          <Grid gap={4}>
            <FormControl>
              <FormLabel className="form-label">Full Name</FormLabel>
              <Input placeholder="Enter full name" name="name" value={formData.name} onChange={handleChange}   />
            </FormControl>

            <FormControl>
              <FormLabel className="form-label">DOB</FormLabel>
              <Input placeholder="DD/MM/YY" name="date" value={formData.dob} onChange={handleChange}   />
            </FormControl>

            <FormControl>
              <FormLabel className="form-label">Email</FormLabel>
              <Input placeholder="Enter your Email id" name="email" value={formData.email} onChange={handleChange}/>
            </FormControl>

            <FormControl>
              <FormLabel className="form-label">Phone No.</FormLabel>
              <Input placeholder="+91 234 567 8900" name="number" value={formData.phone} onChange={handleChange}/>
            </FormControl>
          </Grid>

          <Flex justify="flex-end" mt={6}>
            <Button bg="#0052CC" color="white" px={8}>
              Save Changes
            </Button>
          </Flex>
        </Box>
      </Box>
    </MyDiv>
  );
};

export default EditProfileCard;
