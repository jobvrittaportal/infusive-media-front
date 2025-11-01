import React, { useMemo, useState } from 'react';
import {Table,Thead,Tbody,Tr,Th,Td,TableContainer,Box,Center,Spinner,Text,Flex,Image,Select,InputGroup,InputLeftElement,Input,} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon, Search2Icon } from '@chakra-ui/icons';
import ReactPaginate from 'react-paginate';
import MyDiv from './CustomTable.style';
import RightArrowIcon from '../../../assets/images/arrow-right.svg';
import LeftArrowIcon from '../../../assets/images/arrow-left.svg';
import FilterIcon from '../../../assets/images/Filter.svg';
import SortIcon from '../../../assets/images/SortIcon.svg';

// ---------------- Column Definition ----------------
export interface ColumnProps<T> {
  field?: keyof T | string;
  header?: React.ReactNode;
  body?: (rowData: T, index: number) => React.ReactNode;
  sortable?: boolean;
}

export function Column<T>(_props: ColumnProps<T>) {
  return null;
}

// ---------------- Table Props ----------------
interface CustomTableProps<T> {
  value: T[];
  columns?: ColumnProps<T>[];
  children?: React.ReactNode;
  loading?: boolean;
  emptyMessage?: string;
  emptyImage?: string;
  headerBg?: string;
  headerTextColor?: string;
  striped?: boolean;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  title?: string;
  showSearch?: boolean;
  showFilter?: boolean;
  showSort?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
}

// ---------------- Main Component ----------------
export function CustomTable<T extends Record<string, any>>({
  value,
  columns,
  children,
  loading = false,
  emptyMessage = 'No data found',
  emptyImage = 'https://cdn-icons-png.flaticon.com/512/4076/4076500.png',
  headerBg = '#F8FAFC',
  headerTextColor = '#667085',
  striped = true,
  rowsPerPage = 10,
  rowsPerPageOptions = [10, 20, 50, 100],
  title,
  showSearch = false,
  showFilter = false,
  showSort = false,
  searchPlaceholder = 'Search',
  onSearchChange,
}: CustomTableProps<T>) {
  const [searchValue, setSearchValue] = useState('');

  // Columns resolve
  const resolvedColumns: ColumnProps<T>[] = useMemo(() => {
    if (columns && columns.length) return columns;
    return React.Children.toArray(children)
      .filter(
        (child): child is React.ReactElement<ColumnProps<T>> =>
          React.isValidElement(child) && child.type === Column
      )
      .map((col) => col.props);
  }, [columns, children]);

  // Sorting
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const sortedData = useMemo(() => {
    if (!sortField || !sortOrder) return value;
    return [...value].sort((a, b) => {
      const valA = a[sortField as string];
      const valB = b[sortField as string];
      if (valA == null || valB == null) return 0;
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [value, sortField, sortOrder]);

  const handleSort = (field?: string) => {
    if (!field) return;
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(rowsPerPage);

  const pageCount = Math.ceil(sortedData.length / currentRowsPerPage);
  const start = sortedData.length === 0 ? 0 : currentPage * currentRowsPerPage + 1;
  const end = Math.min((currentPage + 1) * currentRowsPerPage, sortedData.length);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const handleRowsChange = (val: number) => {
    setCurrentRowsPerPage(val);
    setCurrentPage(0);
  };

  const paginatedData = sortedData.slice(
    currentPage * currentRowsPerPage,
    (currentPage + 1) * currentRowsPerPage
  );

  // ---------------- Rendering ----------------
  return (
    <MyDiv>
      {/* Table Header Section  */}
      {(title || showSearch || showFilter || showSort) && (
        <Flex justify="space-between" align="center" mt={5} mb={3}>
          {title && <Text className="font-poppins text_medium text_lg">{title}</Text>}
            <Flex align="center" gap={3}>
            {showSearch && (
              <InputGroup width="240px" bg="white" borderRadius="6px" boxShadow="sm">
                <InputLeftElement pointerEvents="none">
                  <Search2Icon color="rgba(102, 112, 133, 1)" />
                </InputLeftElement>
                <Input
                  type="text"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    onSearchChange?.(e.target.value);
                  }}
                  placeholder={searchPlaceholder}
                  border="none"
                  _focus={{ outline: 'none' }}
                />
              </InputGroup>
              )}
            
              <Flex align="center" gap={3}>
                {showFilter && (
                <Image
                  src={FilterIcon}
                  alt="Filter"
                  cursor="pointer"
                  className='icon_btn'
                  onClick={() => console.log('Filter clicked')}
                />
              )}

              {showSort && (
                <Image
                  src={SortIcon}
                  alt="Sort"
                  className='icon_btn'
                  cursor="pointer"
                  onClick={() => console.log('Sort clicked')}
                />
                )}
              </Flex>
            </Flex>
        </Flex>
      )}

      {/*  Table Section */}
      <Box position="relative" minH="300px" bg="white" borderRadius="12px" boxShadow="sm" mt={3}>
        {loading ? (
          <Center position="absolute" inset={0}>
            <Spinner thickness="4px" speed="0.65s" color="#0052CC" size="xl" />
          </Center>
        ) : value.length === 0 ? (
          <Flex direction="column" justify="center" align="center" height="300px" color="gray.500">
            <Image src={emptyImage} boxSize="100px" mb={3} opacity={0.8} />
            <Text fontSize="15px">{emptyMessage}</Text>
          </Flex>
        ) : (
          <>
            <TableContainer borderRadius="12px" overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead bg={headerBg}>
                  <Tr>
                    {resolvedColumns.map((col, idx) => (
                      <Th
                        key={idx}
                        fontSize="14px"
                        color={headerTextColor}
                        cursor={col.sortable ? 'pointer' : 'default'}
                        onClick={() => col.sortable && handleSort(col.field as string)}
                      >
                        <Flex align="center" gap={1}>
                          {col.header}
                          {col.sortable &&
                            sortField === col.field &&
                            (sortOrder === 'asc' ? (
                              <TriangleUpIcon boxSize={3} />
                            ) : sortOrder === 'desc' ? (
                              <TriangleDownIcon boxSize={3} />
                            ) : null)}
                        </Flex>
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedData.map((row, rowIndex) => (
                    <Tr key={rowIndex} _hover={{ bg: striped ? '#F4F7FB' : 'transparent' }}>
                      {resolvedColumns.map((col, colIndex) => (
                        <Td key={colIndex} fontSize="14px" color="#1D2939">
                          {col.body ? col.body(row, rowIndex) : (row as any)[col.field as string]}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>

      {/* Pagination Section */}
      <Flex justify="center" align="center" mt={4} gap={4}>
        <ReactPaginate
          previousLabel={
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Image src={LeftArrowIcon} alt="Prev" width={15} height={15} />
              Prev
            </span>
          }
          nextLabel={
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Next
              <Image src={RightArrowIcon} alt="Next" width={15} height={15} />
            </span>
          }
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          forcePage={currentPage}
        />

        <Select
          value={currentRowsPerPage}
          onChange={(e) => handleRowsChange(Number(e.target.value))}
          width="70px"
          size="sm"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>

        <Text fontSize="sm" fontWeight="500">
          {sortedData.length > 0
            ? `Showing ${start}-${end} of ${sortedData.length} records`
            : 'No records found'}
        </Text>
      </Flex>
    </MyDiv>
  );
}

export default CustomTable;
