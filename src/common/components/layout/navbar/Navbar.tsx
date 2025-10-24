import { Flex, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

const Navbar = () => {
  return (
    <Flex h="50px" align="center" bg="white" px={4} >
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
    </Flex>
  );
};

export default Navbar;
