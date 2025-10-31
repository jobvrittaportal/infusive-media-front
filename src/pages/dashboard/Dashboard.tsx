import { Box, Button, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import MyDiv from './dashboard.style';
import TotalLeadIcon from "../../assets/images/conversionIcon.svg"
import { LeadByMonthCard, LeadsSourceCard } from './component';
import { useAuth } from '../../common/context/AuthContext';
import { FullName } from '../../common/utils/common';

const dummyData = [
    { title: "Total Leads", value: "347", change: "+12.5% from last month" , icon: TotalLeadIcon,},
    { title: "Quotations Sent", value: "37", change: "+12.5% from last month", icon: TotalLeadIcon, },
    { title: "Conversion Rate", value: "25%", change: "+12.5% from last month" , icon: TotalLeadIcon,},
    { title: "Revenue (MTD)", value: "$347", change: "+12.5% from last month", icon: TotalLeadIcon, },
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
                        <Text className="font-poppins text_lg text_3xl text_bold" textAlign='left'>
                            Hi, {FullName(user)}
                        </Text>
                        <Text className='font-poppins text_md text_regular' mt={2}>Take a look your overview, 
                            <Text as='span' className='font-poppins text_md text_medium'> {formattedDate}</Text>
                        </Text>
                    </Box>
                </Flex>
                <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}  mt={3}>
                    {dummyData.map((item, index) => (
                        <Box key={index} className="stat-card">
                             <Flex align="center" gap={3} mb={2}>
                            <Image src={item.icon} className="card_icon" alt={item.title} />
                            <Text className="card_label font-poppins text_lg text_medium">{item.title}</Text> 
                            </Flex>

                            <Text className="card_value font-poppins text_bold">{item.value}</Text>
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
