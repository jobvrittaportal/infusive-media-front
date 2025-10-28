import { Flex, InputGroup,Button, InputLeftElement, Input, MenuButton, Heading, MenuList, MenuItem, MenuDivider, Menu, Avatar, Image, Text } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import DummyPerson from '../../../../assets/images/profileImage.svg'
import ArrowDownIcon from '../../../../assets/images/arrow-downIcon.svg'
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FullName } from "../../../utils/common";
const Navbar = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
   const {user, logout} = useAuth();

   const handleLogout = () =>{
    logout();
   }
   
  return (
    <Flex h="50px" align="center" bg="white" px={4} justifyContent='space-between'>
      <InputGroup width="240px" bg="#ECECEC" borderRadius="6px">
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="rgba(102, 112, 133, 1)" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search"
          border="none"
          _focus={{ outline: "none" }}
        />
      </InputGroup>
      <Menu>
      <Flex className="profile_menu">
          <MenuButton as={Button} leftIcon={<Avatar size='xs' src={avatarUrl || DummyPerson} />} rightIcon={<Image src={ArrowDownIcon} />}>
            <Text>{FullName(user)}</Text>
          </MenuButton>
        </Flex>
        <MenuList className="dropdown_list">
          <MenuItem as={NavLink} className="font-poppins font_dark text_medium text_md">Profile</MenuItem>
          <MenuDivider mt={0} mb={0} className="divider" />
          <MenuItem onClick={handleLogout} className="font_poppins font_dark text_md text_medium logout_user">Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Navbar;
