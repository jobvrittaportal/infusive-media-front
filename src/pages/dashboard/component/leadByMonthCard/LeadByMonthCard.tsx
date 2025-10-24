import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import MyDiv from "./leadByMonthCard.style";
import { CalendarIcon } from "@chakra-ui/icons";
import Calendar from "react-calendar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, } from "recharts";
import "react-calendar/dist/Calendar.css";

const data = [
  { month: "Jan", lead: 32 },
  { month: "Feb", lead: 40 },
  { month: "Mar", lead: 31 },
  { month: "Apr", lead: 22 },
  { month: "May", lead: 21 },
  { month: "Jun", lead: 33 },
  { month: "Jul", lead: 30 },
  { month: "Aug", lead: 60 },
  { month: "Sep", lead: 50 },
  { month: "Oct", lead: 38 },
  { month: "Nov", lead: 28 },
  { month: "Dec", lead: 34 },
];

const LeadByMonthCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();

  const getYearRange = (year: number) => `${year}-${(year + 1).toString().slice(-2)}`;

  return (
    <MyDiv>
      <Box className="card_box" p={4}>
        <Flex justifyContent="space-between" align="center" mb={4}>
          <Text className="font-poppins font_dark text_semibold text_lg">
            Leads By Month
          </Text>

          <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom-end">
            <PopoverTrigger>
              <Button leftIcon={<CalendarIcon />} padding={3} variant="outline">
                <Text className="font-poppins text_sm text_regular">
                  {getYearRange(selectedYear)}
                </Text>
              </Button>
            </PopoverTrigger>

            <PopoverContent w="auto">
              <PopoverBody p={2} display="flex" justifyContent="center">
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

        <Box w="100%" h="260px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={25}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />

              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ color: "#4A5568", fontWeight: 600 }}
                formatter={(value: number) => [`Lead - ${value}`, ""]}
              />

              <Bar
                dataKey="lead"
                radius={[6, 6, 0, 0]}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={hoveredIndex === index ? "#4C1D95" : "#CBD5E0"}
                    onMouseEnter={() => setHoveredIndex(index)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </MyDiv>
  );
};

export default LeadByMonthCard;
