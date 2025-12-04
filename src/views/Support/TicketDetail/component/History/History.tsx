import { Box, Flex, Text, Divider, Badge, Image, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { baseUrl, useFetch } from "../../../../../hooks/useFetch";
import MyDiv from "./History.style";
import DummyPerson from "../../../../../assets/Images/DummyPerson.svg";
import { ViewIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../../../hooks/useAuth";


interface IHistoryProps {
    ticketId: number;
    activeTab: boolean;
}

export default function History({ ticketId, activeTab }: IHistoryProps) {
    const { fetchApi } = useFetch();
    const { loginObj } = useAuth();
    const [history, setHistory] = useState<any[]>([]);

    const [openPreview, setOpenPreview] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const [fileType, setFileType] = useState("");
    const [modalImage, setModalImage] = useState<string | null>(null);


    const loadHistory = async () => {
        if (!ticketId) return;
        const res = await fetchApi(`Support/getTicketHistory?ticket_Id=${ticketId}`, "GET");
        if (res) setHistory(res);
    };


    const handleViewAttachment = async (url: string) => {
        setFileUrl(url);
        try {
            const res = await fetch(`${baseUrl}Support/NoteFile/${url}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${loginObj?.token || ""}`,
                },
            });

            if (res.ok) {

                const blob = await res.blob();
                if (blob.size > 0) {
                    setModalImage(URL.createObjectURL(blob));
                } else {
                    setModalImage(null);
                }
            }
        } catch (err) {
            console.error("Error fetching avatar", err);
            setModalImage(null);
        }

        // Detect file type
        const ext = (url || "").toLowerCase().split(".").pop() || "";
        if (["jpg", "jpeg", "png"].includes(ext)) setFileType("image");
        else if (ext === "pdf") setFileType("pdf");
        else setFileType("other");

        setOpenPreview(true);
    };

const stripHtml = (html: string = "") =>
    html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();

    useEffect(() => {
        if (activeTab) loadHistory();
    }, [activeTab]);

    return (
        <MyDiv>
            <Box p={4}>
                <Text className="font-poppins text_semibold text_lg" mb={4}>
                    Ticket History
                </Text>

                <Box className="activities-container">
                    {history.length === 0 && (<Text color="gray.500">No history available</Text>)}

                    {history.map((item, index) => (
                        <Box className="activity-card" key={index}>
                            <Flex justifyContent="space-between">
                                <Flex className="activity-header">
                                    <Image src={DummyPerson} className="user-image" />
                                    <Text>{item.updatedBy}</Text>
                                </Flex>
                                <Text className="activity-time">{item.updatedAt}</Text>
                            </Flex>

                            <Divider my={3} />

                            <Flex direction="column" gap={3}>
                                {item.changes.map((change: any, idx: number) => (
                                    <Flex key={idx} align="center" justify="space-between" p={3} bg="white" borderRadius="md" border="1px solid #e2e8f0" className="change-item" >
                                        <Text fontWeight="600">
                                            {change.field ? change.field.charAt(0).toUpperCase() + change.field.slice(1) : ""}
                                        </Text>
                                        {change.field === "Attachment" ? (
                                            <Button variant="ghost" leftIcon={<ViewIcon />} size="sm" colorScheme="blue" onClick={() => handleViewAttachment(change.newValue)} > </Button>
                                        ) : (
                                            <Flex gap={2} alignItems="center">
                                               <Tooltip label={stripHtml(change.oldValue)} hasArrow>
                                                <Badge
                                                    colorScheme="red"
                                                    maxW="200px"
                                                    whiteSpace="nowrap"
                                                    overflow="hidden"
                                                    cursor="pointer"
                                                    isTruncated
                                                >
                                                    {stripHtml(change.oldValue)}
                                                </Badge>
                                            </Tooltip>
                                            
                                            <Text>→</Text>
                                            
                                            <Tooltip label={stripHtml(change.newValue)} hasArrow>
                                                <Badge
                                                    colorScheme="green"
                                                    maxW="200px"
                                                    whiteSpace="nowrap"
                                                    overflow="hidden"
                                                    cursor="pointer"
                                                    isTruncated
                                                >
                                                    {stripHtml(change.newValue)}
                                                </Badge>
                                            </Tooltip>

                                            </Flex>
                                        )}
                                    </Flex>
                                ))}
                            </Flex>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Modal isOpen={openPreview} onClose={() => setOpenPreview(false)} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Attachment Preview</ModalHeader>
                    <ModalBody>
                        {fileType === "image" && (<Image src={modalImage || ""} width="100%" borderRadius="md" />)}
                        {fileType === "pdf" && (
                            <iframe src={modalImage || ""} width="100%" height="500px" style={{ borderRadius: "8px" }} ></iframe>)}

                        {fileType === "other" && (
                            <Box>
                                <Text mb={2}>Preview not available</Text>
                                <Button colorScheme="blue" onClick={() => window.open(fileUrl, "_blank")}>
                                    Download File
                                </Button>
                            </Box>
                        )}
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button onClick={() => setOpenPreview(false)}>Close</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>

        </MyDiv>
    );
}
