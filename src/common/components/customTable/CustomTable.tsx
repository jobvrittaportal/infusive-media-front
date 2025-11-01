import React, { useMemo, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Center,
  Spinner,
  Text,
  Flex,
  IconButton,
  Badge,
  Image,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons';
import MyDiv from './CustomTable.style';

// ---------------- Column Definition ----------------

export interface ColumnProps<T> {
  field?: keyof T | string;
  header?: React.ReactNode;
  body?: (rowData: T, index: number) => React.ReactNode;
  sortable?: boolean;
}

// JSX-based column component
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
}: CustomTableProps<T>) {
  // Infer columns (either from props or JSX children)
  const resolvedColumns: ColumnProps<T>[] = useMemo(() => {
    if (columns && columns.length) return columns;
    return React.Children.toArray(children)
      .filter(
        (child): child is React.ReactElement<ColumnProps<T>> =>
          React.isValidElement(child) && child.type === Column
      )
      .map((col) => col.props);
  }, [columns, children]);

  // ---------------- Sorting ----------------
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
      // toggle or clear
      setSortOrder(sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // ---------------- Pagination ----------------
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  console.log('paginatedData', totalPages);

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));

  // ---------------- Rendering ----------------
  return (
    <MyDiv>
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
                        className="font-poppins"
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
                        <Td key={colIndex} fontSize="14px" className="font-poppins" color="#1D2939">
                          {col.body ? col.body(row, rowIndex) : (row as any)[col.field as string]}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Flex justify="flex-end" align="center" p={3} gap={2}>
                <IconButton
                  aria-label="Previous"
                  icon={<ChevronLeftIcon />}
                  onClick={prevPage}
                  isDisabled={page === 1}
                  size="sm"
                  variant="ghost"
                />
                <Text fontSize="13px">
                  Page {page} of {totalPages}
                </Text>
                <IconButton
                  aria-label="Next"
                  icon={<ChevronRightIcon />}
                  onClick={nextPage}
                  isDisabled={page === totalPages}
                  size="sm"
                  variant="ghost"
                />
              </Flex>
            )}
          </>
        )}
      </Box>
    </MyDiv>
  );
}

export default CustomTable;
