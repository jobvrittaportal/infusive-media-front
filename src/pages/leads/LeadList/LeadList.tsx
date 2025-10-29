import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
 
} from "@chakra-ui/react";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
// import MyDiv from "./leadList.style";

import { useState } from "react";
import MyDiv from "./leadList.style";
import { LeadListModal } from "../components";



const dummyData = [
  { title: "Total Leads", value: "4", className: "totalLeads" },
  { title: "New", value: "1", className: "newLeads" },
  { title: "Assigned", value: "1", className: "assignedLeads" },
  { title: "Quoted", value: "1", className: "quotedLeads" },
];

const header = [
  "S No",
  "Company",
  "Contact",
  "Email",
  "Status",
  "Source",
  "Assigned To",
  "Action",
];

const dummyList = [
  {
    company: "Tech Corp",
    contact: "John Doe",
    email: "(john@techcorp.com)",
    status: "New",
    source: "LinkedIn",
    assignedTo: "Sarah",
    value: "View",
  },
  {
    company: "Digital Inc",
    contact: "Jane Smith",
    email: "(jane@digital.com)",
    status: "Quoted",
    source: "Referral",
    assignedTo: "Mike R.",
    value: "View",
  },
  {
    company: "Web Solutions",
    contact: "Mike Johnson",
    email: "(mike@web.com)",
    status: "Researched",
    source: "Facebook",
    assignedTo: "Tom K.",
    value: "View",
  },
  {
    company: "Marketing Pro",
    contact: "Sarah Wilson",
    email: "(sarah@marketing.com)",
    status: "Assigned",
    source: "CRM Entry",
    assignedTo: "Lisa B.",
    value: "View",
  },
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
    value: "View",
  },
];

const LeadList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return { bg: "#E6F4EA", color: "#0F9D58" };
      case "Quoted":
        return { bg: "#FFF8E1", color: "#F4B400" };
      case "Researched":
        return { bg: "#E3F2FD", color: "#1E88E5" };
      case "Assigned":
        return { bg: "#EDE7F6", color: "#8E24AA" };
      case "Closed":
        return { bg: "#FFEBEE", color: "#D32F2F" };
      default:
        return { bg: "#E0E0E0", color: "#616161" };
    }
  };
  return (
    <MyDiv>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Text className="font-poppins font_dark text_semibold text_xxl">
          Leads
        </Text>
        <Box>
          <Button bg="#E6EEFA" color="#0052CC" mr={3}>
            Import
          </Button>
          <Button bg="#E6EEFA" color="#0052CC" onClick={onOpen}>
            <AddIcon color="#0052CC" mr={2} />
            Add New Lead
          </Button>
        </Box>
      </Flex>

      <Grid templateColumns="repeat(4, 1fr)" gap={5}>
        {dummyData.map((item, index) => (
          <GridItem key={index} className="stats-grid" textAlign="left">
            <Text className="text_xl text_medium" mb={2} color="#0052CC">
              {item.title}
            </Text>
            <Text className="text_3xl text_medium" color="#0052CC">
              {item.value}
            </Text>
          </GridItem>
        ))}
      </Grid>
      <Flex justifyContent="space-between" mt={5}>
        <Text className="text_xl text_medium">Lead List</Text>
        <InputGroup width="240px" bg="white" borderRadius="6px">
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

      <Box bg="white" borderRadius="12px" boxShadow="sm" mt={5}>
        <TableContainer>
          <Table variant="simple">
            <Thead bg="#F8FAFC">
              <Tr>
                {header.map((head, idx) => (
                  <Th key={idx} fontSize="14px" color="#667085">
                    {head}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {dummyList.map((item, index) => {
                const color = getStatusColor(item.status);
                return (
                  <Tr key={index} _hover={{ bg: "#F4F7FB" }}>
                    <Td>{index + 1}</Td>
                    <Td>{item.company}</Td>
                    <Td>{item.contact}</Td>
                    <Td>{item.email}</Td>
                    <Td>
                      <Badge
                        px={3}
                        py={1}
                        borderRadius="md"
                        bg={color.bg}
                        color={color.color}
                        fontSize="13px"
                        fontWeight="500"
                      >
                        {item.status}
                      </Badge>
                    </Td>
                    <Td>{item.source}</Td>
                    <Td>{item.assignedTo}</Td>
                    <Td
                      color="#0052CC"
                      cursor="pointer"
                      fontWeight="500"
                      _hover={{ textDecoration: "underline" }}
                    >
                      {item.value}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader >Add New Leads</ModalHeader> */}
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <LeadListModal />
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <Drawer  isOpen={isOpen} onClose={onClose} size='sm'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <LeadListModal/>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </MyDiv>
  );
};

export default LeadList;
