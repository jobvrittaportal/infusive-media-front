import React, { useState } from "react";
import { Flex, Menu, MenuButton, Heading, MenuList, MenuItem, MenuDivider, Avatar, Button, Image } from "@chakra-ui/react";
import DummyProfile from '../../assets/Images/Hacker-Profile-Image.svg'
import ArrowDownIcon from '../../assets/Images/arrow-downIcon.svg'
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import * as routesNames from "../../constant/routes";

const Navbar = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const {logout, userName} = useAuth();

  const handleLogout = () =>{
    logout();
  };

  return (
    <Flex h="50px" align="center" px={4} justifyContent="right">
      <Menu>
      <Flex className="profile_menu">
          <MenuButton as={Button} leftIcon={<Avatar size='sm' src={avatarUrl || DummyProfile} bg="transparent"/>} rightIcon={<Image src={ArrowDownIcon} />} h={"12"}  bg="transparent"  _hover={{ bg: "transparent" }}>
            <Heading  as="h1" className="font-poppins font_dark text_semibold text_lg">{userName}</Heading>
          </MenuButton>
        </Flex>
        <MenuList className="dropdown_list">
          <MenuItem as={NavLink} to={routesNames.PROFILE} className="font-poppins font_dark text_medium text_md" >Profile</MenuItem>
          <MenuDivider mt={0} mb={0} className="divider" />
          <MenuItem onClick={handleLogout} className="font-poppins font_dark text_medium text_md logout_user">Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Navbar;
