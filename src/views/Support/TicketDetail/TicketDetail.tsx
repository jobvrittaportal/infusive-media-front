import { Text, Flex } from "@chakra-ui/react";
import History from "./component/History";
import MyDiv from './TicketDetail.style';
import { useLocation } from "react-router-dom";

export default function TicketDetails() {
  const location = useLocation();
  const { ticket } = location.state || {};

  return (
    <MyDiv>
      <Flex className="page_heading flex_header">
        <Text className="font-poppins text_semibold text_3xl">History</Text>
      </Flex>

      <History ticketId={ticket?.ticket_Number} activeTab={true} />
    </MyDiv>
  );
}
