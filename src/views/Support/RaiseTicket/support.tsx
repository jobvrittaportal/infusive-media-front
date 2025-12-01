import { Box, Flex, Grid, GridItem, Text, Popover, PopoverTrigger, Button, PopoverContent, PopoverBody, useDisclosure } from '@chakra-ui/react'
import MyDiv from './support.style';
import { CalendarIcon } from '@chakra-ui/icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { CustomButton, CustomToast } from '../../../components';
import Form from './Form';
import Table from './Table';
import { ILazyParams, useFetch } from '../../../hooks/useFetch';
import { hrlenseFetch } from '../../../services/hrlenseApi';

export default function Support() {
  const { addToast } = CustomToast();
  const { fetchApi, loading } = useFetch(addToast);
  const [tableData, setTableData] = useState<any[]>([]);
  const [reload, setReload] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0)

  const [query, setQuery] = useState<{ lazyParams: ILazyParams, filter: Record<string, (string | number)>, }>({
    lazyParams: { first: 0, rows: 10, page: 0, sortField: '', sortOrder: 1 },
    filter: {},
  });

  const loadTableData = async () => {
    const _query = new URLSearchParams({
      lazyParams: JSON.stringify(query.lazyParams),
      filter: JSON.stringify(query.filter),
    }).toString();
    const response = await hrlenseFetch("Support/getTicket", "GET", "", _query);
    if (response) {
      setTableData(response.result);
      setTotalCount(response.totalCount);
    }
  };

  useEffect(() => {
    loadTableData();
  }, [query, reload]);

  return (
    <MyDiv>
      <Box className="page_wrapper">
        <Flex className="page_heading flex_header">
          <Text className="font-poppins text_semibold text_3xl">Support Ticket List</Text>
          <Flex className="filter_section">
            <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom-end">
              <PopoverTrigger>
                <Button leftIcon={<CalendarIcon />} padding={1} variant="outline">
                  <Text className="font-poppins text_sm text_regular">{selectedDate.toDateString()}</Text>
                </Button>
              </PopoverTrigger>
              <PopoverContent w="auto">
                <PopoverBody p={2} display="flex" justifyContent="center">
                  <Calendar value={selectedDate} onChange={(value) => {
                    if (value instanceof Date) {
                      setSelectedDate(value);
                      setQuery((prev) => ({
                        ...prev,
                        filter: {
                          ...prev.filter,
                          date: value.toISOString().split("T")[0],
                        },
                      }));
                      onClose();
                    }
                  }}
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <CustomButton title="Add New Ticket" className=' btn font-poppins text_sm text_medium' onClick={() => setDrawerOpen(true)} />
          </Flex>
        </Flex>

        <Grid className="grid_container">
          <GridItem colSpan={12}>
            <Table tableData={tableData} totalCount={totalCount} query={query} setQuery={setQuery} />
          </GridItem>
        </Grid>
        <Form drawerOpen={drawerOpen} close={() => setDrawerOpen(false)} reload={reload} setReload={setReload} />
      </Box>
    </MyDiv>
  );
}