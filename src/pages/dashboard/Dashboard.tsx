import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import MyDiv from './dashboard.style';
import { LeadByMonthCard, LeadsSourceCard } from './component';
import { useAuth } from '../../common/context/AuthContext';
import { FullName } from '../../common/utils/common';
import TotalLeadsIcon from "../../assets/images/TotalLeads-Icon.svg"
import QuotationsSentIcon from "../../assets/images/Quotation-Icon.svg"
import ConversionRateIcon from "../../assets/images/ConversionRate-Icon.svg"
import RevenueIcon from "../../assets/images/Revenue-Icon.svg"

const dummyData = [
    { title: "Total Leads", value: "347", change: "+12.5% from last month" , icon: TotalLeadsIcon,},
    { title: "Quotations Sent", value: "37", change: "+12.5% from last month", icon: QuotationsSentIcon, },
    { title: "Conversion Rate", value: "25%", change: "+12.5% from last month" , icon: ConversionRateIcon,},
    { title: "Revenue (MTD)", value: "$347", change: "+12.5% from last month", icon: RevenueIcon, },
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
                        <Text className="font-poppins text_lg text_3xl text_bold" textAlign='left' color="#0052CC">
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
                            <Image src={item.icon} className="card_icon" alt={item.title} boxSize={10}/>
                            <Text className="card_label font-poppins text_xl text_medium">{item.title}</Text> 
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
