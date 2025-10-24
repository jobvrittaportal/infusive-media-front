import {
  Box,
  Button,
  Flex,
  Grid,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import Calendar from "react-calendar";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import MyDiv from "./leadsSourceCard.style";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LeadData {
  name: string;
  value: number;
  color: string;
}

const data: LeadData[] = [
  { name: "Website", value: 35, color: "#E8F0FF" },
  { name: "LinkedIn", value: 22, color: "#BFD3FA" },
  { name: "Cold Email", value: 15, color: "#79A8FF" },
  { name: "Referral", value: 28, color: "#0047FF" },
];

const LeadsSourceCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();

  const getYearRange = (year: number) => `${year}-${(year + 1).toString().slice(-2)}`;

  // Chart.js configuration
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.formattedValue}%`,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <MyDiv>
      <Box className="card_box">
        {/* Header */}
        <Flex justify="space-between" align="center" mb={5}>
          <Text className="font-poppins font_dark text_semibold text_lg">
                      Leads By Source
                    </Text>
          

          <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom-end">
            <PopoverTrigger>
              <Button
                leftIcon={<CalendarIcon />}
                size="sm"
                variant="outline"
                borderColor="gray.200"
                color="gray.700"
                fontWeight="500"
                px={3}
                py={2}
                _hover={{ bg: "gray.50" }}
              >
                <Text className="font-poppins text_sm text_regular">
                  {getYearRange(selectedYear)}
                </Text>
              </Button>
            </PopoverTrigger>

            <PopoverContent w="auto" border="none" boxShadow="md">
              <PopoverBody p={2}>
                <Calendar
                  value={new Date(selectedYear, 0, 1)}
                  onChange={(value : any) => {
                    if (value instanceof Date) {
                      setSelectedYear(value.getFullYear());
                      onClose();
                    }
                  }}
                  view="decade"
                  maxDetail="decade"
                  minDetail="decade"
                  tileDisabled={({ date }) => date.getFullYear() < currentYear}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>

        {/* Chart + Legend Grid */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-around"
          gap={6}>
          <Box w='170px' h='199px'>
            <Center h="100%">
              <Doughnut data={chartData} options={options} />
            </Center>
          </Box>

         
         
        </Flex>
         <Grid templateColumns="repeat(2, 1fr)" gap={3} >
            {data.map((item, index) => (
              <Flex
              alignContent="center"
                key={index}
                justify='space-between'
                align="center"
                w="full"
                borderColor="gray.100"
               p={1}
              >
                <Flex align="center" gap={3}>
                  <Box
                    w="12px"
                    h="12px"
                    borderRadius="full"
                    bg={item.color}
                    border="1px solid"
                    borderColor="gray.200"
                    
                  />
                  <Center >
                  <Text className="font-poppins text_sm font_medium font_dark">
                    {item.name} <Text className="font-poppins text_sm font_medium font_dark" as='span'>
                  ({item.value})%
                </Text>
                  </Text>
                  </Center>
                </Flex>
                
              </Flex>
            ))}
          </Grid>
      </Box>
    </MyDiv>
  );
};

export default LeadsSourceCard;
