import { useEffect, useState } from "react";
import {
  Box, Text, Textarea, Button, Image, Flex, Input,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter,
  useDisclosure
} from "@chakra-ui/react";

import MyDiv from "./Notes.style";
import DummyPerson from "../../../../../assets/Images/DummyPerson.svg";
import { CustomToast } from "../../../../../components";
import { baseUrl, useFetch } from "../../../../../hooks/useFetch";
import { useAuth } from "../../../../../hooks/useAuth";

interface INotesProps {
  ticketId: number;
  activeTab: boolean
}

export default function Notes({ ticketId, activeTab }: INotesProps) {
  const { addToast } = CustomToast();
  const { fetchApi } = useFetch(addToast);
  const { loginObj } = useAuth();

  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalImage, setModalImage] = useState<string | null>(null);


  const handleViewImage = async (img: string) => {
    try {
      const res = await fetch(`${baseUrl}Support/NoteFile/${img}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginObj?.token || ""}`,
        },
      });

      if (res.ok) {

        const blob = await res.blob();
        if (blob.size > 0) {
          setModalImage(URL.createObjectURL(blob));
          onOpen();
        } else {
          setModalImage(null);
        }
      }
    } catch (err) {
      console.error("Error fetching avatar", err);
      setModalImage(null);
    }
  };


  const handleImageUpload = (e: any) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      addToast({ message: "Only JPG, PNG, JPEG and PDF files are allowed", status: "error" });
      e.target.value = "";
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile));
  };

  const loadComments = async () => {
    const response = await fetchApi(`Support/getNotes?ticket_Id=${ticketId}`, "GET");
    if (response) {
      setComments(response);
    }
  };

  const handleSubmit = async () => {
    if (!note.trim()) {
      addToast({ message: "Please enter a activity", status: "warning" });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("ticket_Id", ticketId.toString());
    formData.append("note_Text", note);

    if (file) formData.append("attachment", file);

    const response = await fetchApi("Support/addNote", "POST", formData, "", "", true);

    setLoading(false);

    if (response) {
      addToast({ message: "Activity added successfully", status: "success" });
      setNote("");
      setFile(null);
      setFileUrl(null);
      loadComments();
    }
  };

  useEffect(() => {
    if (activeTab)
      loadComments();
  }, [activeTab]);

  return (
    <MyDiv>
      <Text className="font-poppins text_semibold text_lg" mb={2}>Work Activities</Text>

      <Box className="notes-box">
        <Textarea placeholder="Write a activity..." value={note} onChange={(e) => setNote(e.target.value)} />
        <Flex mt={3} justifyContent="flex-end" alignItems="center" gap="12px">
          {file && <Text>{file.name}</Text>}
          <Input id="fileUpload" type="file" accept="image/*" onChange={handleImageUpload} display="none" />
          <Button colorScheme="teal" onClick={() => document.getElementById("fileUpload")?.click()} > Upload Document</Button>
          <Button colorScheme="blue" isLoading={loading} onClick={handleSubmit} > Post </Button>
        </Flex>
      </Box>

      <Text className="font-poppins text_semibold text_md" mt={4} mb={2}>
        Comments:
      </Text>

      <Box className="activities-container">
        {comments.map((item: any) => (
          <Box className="activity-card" key={item.id}>
            <Flex justifyContent="space-between">
              <Flex className="activity-header">
                <Image src={DummyPerson} className="user-image" />
                <Text>{item.created_By_Name}</Text>
              </Flex>
              <Text className="activity-time">{item.created_At}</Text>
            </Flex>
            <Text m={4}>{item.note_Text}</Text>
            {item.file_Url && (
              <Flex justifyContent="flex-end" mr={4} mt={-2}>
                <Button size="sm" colorScheme="blue" onClick={() => handleViewImage(item.file_Url)} >
                  View Document
                </Button>
              </Flex>
            )}
          </Box>
        ))}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Document Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH="500px" overflowY="auto">
            {modalImage && (
              <Image src={modalImage} width="100%" borderRadius="md" />

            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </MyDiv>
  );
}

