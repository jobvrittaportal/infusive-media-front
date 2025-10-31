import React, { ReactNode } from "react";
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
} from "@chakra-ui/react";
import MyDiv from "./CustomTable.style";

// --- Type for Column Props ---
interface ColumnProps<T> {
  field?: keyof T | string;
  header?: ReactNode;
  body?: (rowData: T, index: number) => ReactNode;
}

// This is just a placeholder to declare columns in JSX
export function Column<T>(_props: ColumnProps<T>) {
  return null;
}

// --- Main Table Props ---
interface CustomTableProps<T> {
  value: T[];
  children: React.ReactNode;
  loading?: boolean;
  emptyMessage?: string;
  headerBg?: string;
  headerTextColor?: string;
  striped?: boolean;
}

// --- Table Component ---
export function CustomTable<T>({
  value,
  children,
  loading = false,
  emptyMessage = "No data found",
  headerBg = "#F8FAFC",
  headerTextColor = "#667085",
  striped = true,
}: CustomTableProps<T>) {
  const columns = React.Children.toArray(children)
    .filter(
      (child): child is React.ReactElement<ColumnProps<T>> =>
        React.isValidElement(child) && child.type === Column
    )
    .map((col) => col.props);

  return (
    <MyDiv>
      <Box position="relative" minH="300px" bg="white" borderRadius="12px" boxShadow="sm" mt={3}>
        {loading ? (
          <Center position="absolute" inset={0}>
            <Spinner thickness="4px" speed="0.65s" color="#0052CC" size="xl" />
          </Center>
        ) : value.length > 0 ? (
          <TableContainer borderRadius="12px">
            <Table variant="simple" size="sm">
              <Thead bg={headerBg}>
                <Tr>
                  {columns.map((col, idx) => (
                    <Th key={idx} fontSize="14px"  className="font-poppins" color={headerTextColor}>
                      {col.header}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {value.map((row, rowIndex) => (
                  <Tr key={rowIndex} _hover={{ bg: "#F4F7FB" }}>
                    {columns.map((col, colIndex) => (
                      <Td key={colIndex} fontSize="14px" className="font-poppins" color="#1D2939">
                        {col.body
                          ? col.body(row, rowIndex)
                          : (row as any)[col.field as string]}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Flex justify="center" align="center" height="200px" color="gray.500">
            <Text>{emptyMessage}</Text>
          </Flex>
        )}
      </Box>
    </MyDiv>
  );
}

export default CustomTable;
