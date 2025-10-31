import { Flex, InputGroup,Button, InputLeftElement, Input, MenuButton, Heading, MenuList, MenuItem, MenuDivider, Menu, Avatar, Image, Text } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import DummyPerson from '../../../../assets/images/profileImage.svg'
import ArrowDownIcon from '../../../../assets/images/arrow-downIcon.svg'
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { FullName } from "../../../utils/common";
import * as routesNames from "../../../../routes/RouteConstant";


const Navbar = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
   const {user, logout} = useAuth();
    const navigate = useNavigate();

   const handleLogout = () =>{
    logout();
   }
   
  return (
    <Flex h="50px" align="center" bg="#E6EEFA" px={4} justifyContent="right">
      {/* <InputGroup width="240px" bg="white" borderRadius="6px">
        <InputLeftElement pointerEvents="none">
          <Search2Icon  />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search"
          border="none"
          _focus={{ outline: "none" }}
        />
      </InputGroup> */}
      <Menu>
      <Flex className="profile_menu">
          <MenuButton as={Button} leftIcon={<Avatar size='sm' src={avatarUrl || DummyPerson} bg="transparent"/>} rightIcon={<Image src={ArrowDownIcon} />} h={"12"}  bg="transparent"  _hover={{ bg: "transparent" }}>
            <Heading  as="h1" className="font-poppins font_dark text_semibold text_lg">{FullName(user)}</Heading>
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
