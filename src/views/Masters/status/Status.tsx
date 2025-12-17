import React, { useEffect, useState } from "react";
import { Badge, Box, Flex, Input, Text } from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";

import { CustomButton, CustomTable, CustomToast } from "../../../components";
import { useFetch } from "../../../hooks/useFetch";
import useDebounce from "../../../hooks/useDebounce";
import { Column } from "../../../components/customTable/CustomTable";

import StateDiv from "./Status.style";
import Detail from "./Details";
import { IStateTable, IStatus } from "./model";

const Status = () => {
  const [statusData, setStatusData] = useState<IStateTable>({
    status: [],
    totalCount: 0,
  });

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<IStatus | null>(null);
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
  const [loading, setLoading] = useState(false);

  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);
  const debounceSearch = useDebounce(search, 700);

  const handleEdit = (row: IStatus) => {
    setSelectedStatus(row);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setSelectedStatus(null);
    setShowForm(true);
  };

  const loadStatuses = async () => {
    setLoading(true);

    const res = await fetchApi(
      "Status",
      "GET",
      null,
      `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`,
      ""
    );

    if (res) setStatusData(res);

    setLoading(false);
  };


  const handelEditStatus = async (row: any) => {
    const res = await fetchApi(
      `Status/toggleStatus/${row.id}`,
      "PUT",
      { id: row.id, status: !row.status },
      null,
      "Status Changed"
    );

    if (res) {
      loadStatuses();
    }
  };


  useEffect(() => {
    loadStatuses();
  }, [pagination, debounceSearch]);

  return (
    <StateDiv>
      <Flex justify="space-between">
        <Box className="top-section">
          <Text className="font-poppins text_xxl text_semibold">Status</Text>
        </Box>

        <Box display="flex" gap={3}>
          <Box className="search-box">
            <Input
              bg="#fff"
              type="text"
              placeholder="Search Status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          <CustomButton
            title="Add New Status"
            onClick={handleAddNew}
            leftIcon={<AddIcon />}
            className="btn_theme"
          />
        </Box>
      </Flex>

      <CustomTable
        value={statusData.status}
        onPageChange={setPagination}
        rowsPerPage={pagination.limit}
        totalRecords={statusData.totalCount}
        loading={loading}
        headerBg="#E6F0FF"
        headerTextColor="#1A202C"
        emptyMessage="No Data Found"
      >
        <Column header="S.No" body={(_, index) => index + 1} />
        <Column header="Status Name" field="statusName" />
        <Column
          header="Status"
          body={(row: IStatus) => (
            <span
              onClick={() => handelEditStatus(row)}
              style={{ cursor: "pointer" }}
            >
              {row.status ? (
                <Badge colorScheme="green" px={2} py={1} borderRadius={4}>
                  Active
                </Badge>
              ) : (
                <Badge colorScheme="red" px={2} py={1} borderRadius={4}>
                  Inactive
                </Badge>
              )}
            </span>
          )}
        />

        <Column
          header="Action"
          body={(row: IStatus) => (
            <EditIcon cursor="pointer" color="blue.500" onClick={() => handleEdit(row)} />
          )}
        />
      </CustomTable>

      {/* Drawer */}
      <Detail
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        status={selectedStatus}
        loadStatuses={loadStatuses}
      />
    </StateDiv>
  );
};

export default Status;
