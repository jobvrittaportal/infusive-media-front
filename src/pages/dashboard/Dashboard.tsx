import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import MyDiv from './dashboard.style';
import { Search2Icon } from '@chakra-ui/icons';
import { LeadByMonthCard, LeadsSourceCard } from './component';
import { useAuth } from '../../common/context/AuthContext';
import { FullName } from '../../common/utils/common';

const dummyData = [
    { title: "Total Leads", value: "347", change: "+12.5% from last month" },
    { title: "Quotations Sent", value: "37", change: "+12.5% from last month" },
    { title: "Conversion Rate", value: "25%", change: "+12.5% from last month" },
    { title: "Revenue (MTD)", value: "$347", change: "+12.5% from last month" },
];


const today = new Date();
const formattedDate = today.toLocaleDateString('en-GB');
const Dashboard = () => {
    const {user} = useAuth();

    return (
        <MyDiv>
            <Box>
                <Flex justifyContent="space-between">
                    <Box>
                        <Text className="greeting text_4xl text_regular" textAlign='left'>
                            Hi, {FullName(user)}
                        </Text>
                        <Text className='greeting text_md text_regular'>Take a look your overview, 
                            <Text as='span' className='greeting text_lg text_medium'> {formattedDate}</Text>
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