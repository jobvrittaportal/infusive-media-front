import React, { useEffect, useState } from "react";
import { Box, Text, Badge } from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";

import UserDiv from "./poc.style";
import { IPoc } from "./model";
import CustomButton from "../../../components/CustomButton";
import CustomTable from "../../../components/customTable";
import { Column } from "../../../components/customTable/CustomTable";
import { useFetch } from "../../../hooks/useFetch";
import { CustomToast } from "../../../components";
import Detail from "./Detail";

const Poc = () => {
  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);

  const [data, setData] = useState<{ pocs: IPoc[]; totalCount: number }>({pocs: [],totalCount: 0,});
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [selectedPoc, setSelectedPoc] = useState<IPoc | null>(null);
  const [showForm, setShowForm] = useState(false);


  const loadPocs = async () => {
    setLoading(true);

    const res = await fetchApi(`CompanyPOC?page=${pagination.page}&limit=${pagination.limit}`,"GET");
    setLoading(false);

    if (res) {
      setData({
        pocs: res.pocs ?? [],
        totalCount: res.totalCount ?? 0,
      });
    }
  };

  useEffect(() => {
    loadPocs();
  }, [pagination.page, pagination.limit]);

  const pageChangeFunction = (e: any) => {
    setPagination({
      page: e.page + 1,
      limit: e.rows,
    });
  };

  const handleEdit = (row: IPoc) => {
    setSelectedPoc(row);
    setShowForm(true);
  };

  return (
    <UserDiv>
      {/* HEADER */}
      <Box className="top-section">
        <Text className="font-poppins text_xxl text_semibold">POC</Text>
        <CustomButton
          title="Add New POC"
          leftIcon={<AddIcon />}
          className="btn_theme"
          onClick={() => {
            setSelectedPoc(null);
            setShowForm(true);
          }}
        />
      </Box>

      <CustomTable
        value={data.pocs}
        onPageChange={pageChangeFunction}
        rowsPerPage={pagination.limit}
        totalRecords={data.totalCount}
        loading={loading}
        emptyMessage="No POC Found"
      >
        <Column header="S.No" body={(_, index) => index + 1} />
        <Column header="POC Name" field="name" />
        <Column header="Company" field="companyName" />
        <Column header="Email" field="email" />
        <Column header="Whatsapp" field="whatsapp" />
        <Column header="linkedinUrl" field="linkedinUrl" />

        <Column
          header="Phone"
          body={(row: IPoc) => (
            <>
              {row.phoneCountryCode} {row.phoneNumber}
            </>
          )}
        />

        <Column header="Designation" field="designationName" />

        <Column
          header="Status"
          body={(row: IPoc) => (
            <Badge
              colorScheme={row.status ? "green" : "red"}
              px={2}
              py={1}
              borderRadius={4}
            >
              {row.status ? "Active" : "Inactive"}
            </Badge>
          )}
        />

        <Column
          header="Action"
          body={(row: IPoc) => (
            <EditIcon
              cursor="pointer"
              color="blue.500"
              onClick={() => handleEdit(row)}
            />
          )}
        />
      </CustomTable>

      {showForm && (
        <Detail
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          poc={selectedPoc}
          loadPoc={loadPocs}
        />
      )}
    </UserDiv>
  );
};

export default Poc;



