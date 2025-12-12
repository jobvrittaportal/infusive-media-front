import React, { useEffect, useState } from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";

import { CustomButton, CustomTable, CustomToast } from "../../../components";
import { useFetch } from "../../../hooks/useFetch";
import useDebounce from "../../../hooks/useDebounce";
import { Column } from "../../../components/customTable/CustomTable";
import { ISourceTable, ISource } from "./model";
import Detail from "./Details";
import MyDiv from "./Source.style";

const Source = () => {
  const [sourceData, setSourceData] = useState<ISourceTable>({
    sources: [],
    totalCount: 0,
  });

  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [selectedSource, setSelectedSource] = useState<ISource | null>(null);

  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);
  const debounceSearch = useDebounce(search, 700);

  const loadSources = async () => {
    setLoading(true);

    const res = await fetchApi(
      "Source", // FIXED API ENDPOINT
      "GET",
      null,
      `skip=${pagination.skip}&limit=${pagination.limit}&search=${search}`,
      ""
    );

    if (res) setSourceData(res);

    setLoading(false);
  };

  useEffect(() => {
    loadSources();
  }, [pagination, debounceSearch]);

  const pageChange = (e: { skip: number; limit: number }) => {
    setPagination(e);
  };

  const handleAddNew = () => {
    setSelectedSource(null);
    setShowForm(true);
  };

  const handleEdit = (row: ISource) => {
    setSelectedSource(row);
    setShowForm(true);
  };

  return (
    <MyDiv>
      {/* HEADER */}
      <Flex justify="space-between">
        <Box className="top-section">
          <Text className="font-poppins text_xxl text_semibold">Source</Text>
        </Box>

        <Box display="flex" gap={3}>
          <Box className="search-box">
            <Input
              bg="#fff"
              type="text"
              placeholder="Search Source..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          <CustomButton
            title="Add New Source"
            onClick={handleAddNew}
            leftIcon={<AddIcon />}
            className="btn_theme"
          />
        </Box>
      </Flex>

      {/* TABLE */}
      <CustomTable
        value={sourceData.sources}
        onPageChange={pageChange}
        rowsPerPage={pagination.limit}
        totalRecords={sourceData.totalCount}
        loading={loading}
        headerBg="#E6F0FF"
        headerTextColor="#1A202C"
        emptyMessage="No Data Found"
      >
        <Column header="S.No" body={(_, index) => index + 1} />
        <Column header="Source Name" field="name" />

        <Column
          header="Action"
          body={(row: ISource) => (
            <EditIcon
              cursor="pointer"
              color="blue.500"
              onClick={() => handleEdit(row)}
            />
          )}
        />
      </CustomTable>

      {/* FORM DRAWER */}
      <Detail
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        states={selectedSource}
        loadstates={loadSources}
      />
    </MyDiv>
  );
};

export default Source;
