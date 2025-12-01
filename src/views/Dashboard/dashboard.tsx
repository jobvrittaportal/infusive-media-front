
import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import MyDiv from './dashboard.style';
import { Search2Icon } from '@chakra-ui/icons';
import { LeadByMonthCard, LeadsSourceCard } from './components';
import { useAuth } from '../../hooks/useAuth';



const dummyData = [
  { title: "Total Leads", value: "347", change: "+12.5% from last month" },
  { title: "Quotations Sent", value: "37", change: "+12.5% from last month" },
  { title: "Conversion Rate", value: "25%", change: "+12.5% from last month" },
  { title: "Revenue (MTD)", value: "$347", change: "+12.5% from last month" },
];


const today = new Date();
const formattedDate = today.toLocaleDateString('en-GB');
const Dashboard = () => {
  const { userName } = useAuth();

  return (
    <MyDiv>
      <Box>
        <Flex justifyContent="space-between">
          <Box>
            <Text color="#0052CC" fontFamily="'Poppins', sans-serif" fontSize="32px" fontWeight="700" textAlign='left'>
              {`Hi, ${userName}`}
            </Text>
            <Text
              fontSize="18px"
              fontWeight="400"
              fontFamily="'Poppins', sans-serif"
              color="#424242"
            >
              Take a look at your overview,
              <Text
                as="span"
                fontWeight="600"
                fontSize="20px"
                fontFamily="'Poppins', sans-serif"
                color="#0052CC"
              >
                {" " + formattedDate}
              </Text>
            </Text>
          </Box>
          <Button bg='#E6EEFA' color='#0052CC'>
            <Search2Icon color="#0052CC" mr={3} />
            Add New Lead
          </Button>
        </Flex>

        <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4} className="stats-grid" mt={3}>
          {dummyData.map((item, index) => (
            <Box key={index} className="stat-card" textAlign='left'>
              <Text className="stat-title text_md text_medium" alignContent='left'>{item.title}</Text>
              <Text className="stat-value">{item.value}</Text>
              <Text className="stat-change text_medium text_md">{item.change}</Text>
            </Box>
          ))}


        </Grid>
        <Grid className='grid_gap_sm grid_container' mt={6} gap={14}>
          <GridItem colSpan={8}>
            <LeadByMonthCard />
          </GridItem>
          <GridItem colSpan={4}>
            <LeadsSourceCard />
          </GridItem>
        </Grid>
      </Box>
    </MyDiv>
  )
}
export default Dashboard;