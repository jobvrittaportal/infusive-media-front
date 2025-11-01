import { Box, Flex, Grid,  Text, Badge, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure, ModalCloseButton, Image,} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import MyDiv from "./leadList.style";
import { LeadListModal } from "../components";
import CustomTable from "../../../common/components/customTable";
import { Column } from "../../../common/components/customTable/CustomTable";
import TotalLeadsIcon from "../../../assets/images/TotalLeads-Icon.svg"
import NewLeadIcon from "../../../assets/images/NewLeads-Icon.svg"
import AssignedIcon from "../../../assets/images/Assigned-Icon.svg"
import QuotedIcon from "../../../assets/images/Quotation-Icon.svg"
import CustomButton from "../../../common/components/customButton";

const dummyData = [
  { title: "Total Leads", value: "4", className: "totalLeads",icon: TotalLeadsIcon },
  { title: "New", value: "1", className: "newLeads", icon: NewLeadIcon,},
  { title: "Assigned", value: "1", className: "assignedLeads", icon: AssignedIcon,},
  { title: "Quoted", value: "1", className: "quotedLeads", icon: QuotedIcon, },
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
  {
    company: "SEO Masters",
    contact: "David Lee",
    email: "(david@seo.com)",
    status: "Closed",
    source: "LinkedIn",
    assignedTo: "John D.",
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
        <Text className="font-poppins font_dark text_semibold text_xxl">Leads</Text>
        <Box display="flex" gap="10px">
           <CustomButton label="Import" />
           <CustomButton label="Add New Lead" leftIcon={<AddIcon />} onClick={onOpen} />
        </Box>
      </Flex>

       <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}  mt={3}>
        {dummyData.map((item, index) => (
          <Box key={index} className="stats-grid" >
             <Flex align="center" gap={3} mb={2}>
            <Image src={item.icon} className="card_icon" alt={item.title} boxSize={10}/>
            <Text className="card_label font-poppins text_xl text_medium" mb={2} >{item.title}</Text>
            </Flex>
             <Text className="card_value font-poppins text_bold" color="#0052CC">{item.value}</Text>
          </Box>
        ))}
      </Grid>
    
      <CustomTable title="Lead List" showSearch showFilter showSort onSearchChange={(val) => console.log("Search:", val)} value={dummyList}>
        <Column header="S.No" body={(_, index) => index + 1} />
        <Column header="Company" field="company" />
        <Column header="Contact" field="contact" />
        <Column header="Email" field="email" />
        <Column
          header="Status"
          body={(row: any) => {
            const color = getStatusColor(row.status);
            return (
              <Badge
                px={3}
                py={1}
                borderRadius="md"
                bg={color.bg}
                color={color.color}
                fontSize="13px"
                fontWeight="500"
              >
                {row.status}
              </Badge>
            );
          }}
        />
        <Column header="Source" field="source" />
        <Column header="Assigned To" field="assignedTo" />
        <Column
          header="Action"
          body={(row: any) => (
            <Text
              color="#0052CC"
              cursor="pointer"
              fontWeight="500"
              _hover={{ textDecoration: "underline" }}
            >
              {row.value}
            </Text>
          )}
        />
      </CustomTable>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <LeadListModal />
          </ModalBody>
        </ModalContent>
      </Modal>
    </MyDiv>
  );
};

export default LeadList;
