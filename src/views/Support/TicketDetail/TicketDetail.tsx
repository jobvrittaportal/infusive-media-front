import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, Flex } from "@chakra-ui/react";
import Notes from "./component/Notes";
import DetailsForm from "./component/DetailsForm";
import History from "./component/History";
import MyDiv from './TicketDetail.style';
import { useLocation } from "react-router-dom";


export default function TicketDetails() {
  const [tabIndex, setTabIndex] = useState(0);
  const location = useLocation();
  const { ticket } = location.state || {};

  const headerName = (tab: any) => {
    if (tab === 0) {
      return 'Details'
    } else if (tab === 1) {
      return 'Activities'
    } else if (tab === 2) {
      return 'History'
    } else {
      return 'Details'
    }
  }


  return (
    <MyDiv>
      <Tabs variant='unstyled' index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <Flex className="page_heading flex_header">
          <Text className="font-poppins text_semibold text_3xl">{headerName(tabIndex)}</Text>
          <TabList gap={2} color="blue" >
            <Box border="1px solid lightblue" borderRadius="8px">
              <Tab _selected={{ color: 'white', bg: '#1565d8', borderRadius: '8px' }} className='font-poppins text_lg text_medium'>Details</Tab>
            </Box>
            <Box border="1px solid lightblue" borderRadius="8px">
              <Tab _selected={{ color: 'white', bg: '#1565d8', borderRadius: '8px' }} className='font-poppins text_lg text_medium'>Activities</Tab>
            </Box>
            <Box border="1px solid lightblue" borderRadius="8px">
              <Tab _selected={{ color: 'white', bg: '#1565d8', borderRadius: '8px' }} className='font-poppins text_lg text_medium'>History</Tab>
            </Box>
          </TabList>
        </Flex>

        <TabPanels>
          <TabPanel>
            <DetailsForm ticketDetail={ticket} activeTab={tabIndex === 0} />
          </TabPanel>

          <TabPanel>
            <Notes ticketId={ticket?.ticket_Number} activeTab={tabIndex === 1} />
          </TabPanel>

          <TabPanel>
            <History ticketId={ticket?.ticket_Number} activeTab={tabIndex === 2} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MyDiv>
  );
}
