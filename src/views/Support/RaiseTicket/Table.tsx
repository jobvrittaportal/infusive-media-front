import React, { useState } from 'react'
import { CustomTable } from '../../../components';
import { Badge, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Tooltip, } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { AttachmentIcon, ViewIcon } from '@chakra-ui/icons';
import { getImpactColor, getPriorityColor, getStatusColor } from './modal';
import { Column } from '../../../components/customTable/CustomTable';
import * as routesNames from '../../../constant/routes'

interface ITableProps {
    tableData: any[];
    totalCount: number
    query: any;
    setQuery: React.Dispatch<React.SetStateAction<any>>;
}

export default function Table({ tableData, query, setQuery, totalCount, }: ITableProps) {

    const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()

    const openAttachmentModal = (url: string) => {
        setAttachmentUrl(url);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setAttachmentUrl(null);
    };

    const handleClick = (row: any) => {
        navigate(routesNames.TICKETDETAIL, { state: { ticket: row } });
    }


    return (
        <div>
              {/* <Text className='font-poppins text_xxl text_semibold' textAlign="left">Ticket</Text> */}
            <CustomTable value={tableData}
               
                headerBg='#E6F0FF'
                headerTextColor='#1A202C'
                emptyMessage='No data found'
            >
                <Column header="S.No" body={(_, i) => i + 1} />
                <Column header="Ticket No." field='ticket_Id' />
                <Column header="Application" field='application_Group_Name' />

                <Column
                    header="Priority"
                    body={(row: any) => (
                        <Badge colorScheme={getPriorityColor(row.priority)}>{row.priority}</Badge>
                    )}
                />
                <Column
                    header="Impact"
                    body={(row: any) => (
                        <Badge colorScheme={getImpactColor(row.impact)}>{row.impact}</Badge>
                    )}
                />

                <Column header="Assigned Group" field='assigned_Grouped_Name' />
                <Column header="Assigned To" body={(row: any) => row.agent_Name?.trim() || "-"} />

                <Column
                    header="Status"
                    body={(row: any) => (
                        <Badge colorScheme={getStatusColor(row.status_Name)}>{row.status_Name}</Badge>
                    )}
                />

                <Column header="Created At" field='open' />
                <Column header="Actions" body={(rowData: any) => (
                    <Flex gap={2} alignItems="center">
                        <Tooltip label="View Details" placement="top">
                            <IconButton size="sm" aria-label="View Details" icon={<ViewIcon />} variant="outline" onClick={() => handleClick(rowData)} />
                        </Tooltip>
                        {rowData.file && (
                            <Tooltip label="View Attachment" placement="top">
                                <IconButton size="sm" aria-label="View Attachment" icon={<AttachmentIcon />} variant="outline" colorScheme="blue" onClick={() => openAttachmentModal(rowData.file)} />
                            </Tooltip>
                        )}
                    </Flex>
                )} />
            </CustomTable>
            {/* <CustomPagination pageCount={pageCount} rowsPerPageOptions={[10, 50, 100, 200]} handlePageClick={handlePageClick} rowsPerPage={query.lazyParams.rows} setRowsPerPage={setRowsPerPage} totalRecords={totalCount} currentPage={query.lazyParams.page} /> */}
            <Modal isOpen={isModalOpen} onClose={closeModal} size="4xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Attachment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {attachmentUrl && (
                            <>
                                {(attachmentUrl.endsWith(".jpg") || attachmentUrl.endsWith(".jpeg") || attachmentUrl.endsWith(".png")) && (
                                    <img src={attachmentUrl} alt="Attachment" style={{ width: "100%", height: "100%", borderRadius: "8px" }} />
                                )}

                                {attachmentUrl.endsWith(".pdf") && (<iframe src={attachmentUrl} style={{ width: "100%", height: "600px" }} title="PDF Attachment" />)}

                                {!attachmentUrl.match(/\.(jpg|jpeg|png|pdf)$/) && (
                                    <Text>Preview not available. <a href={attachmentUrl} target="_blank" rel="noopener noreferrer">Download File</a></Text>
                                )}
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>

        </div >
    )
}
