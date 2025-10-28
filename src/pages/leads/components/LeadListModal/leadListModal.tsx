
import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import MyDiv from './leadListModal.style';
import { AddIcon } from '@chakra-ui/icons';


const LeadListModal = () => {
 
  return (
    <MyDiv>
      <Box bg='#E6EEFA' w='100%' h="50px" justifyContent='center' alignContent='center'>
      <Text className="font-poppins font_dark text_semibold text_3xl" textAlign='center'> Add New Leads</Text>
      </Box>
      <Box textAlign='left'className="font-poppins font_dark text_semibold text_lg">
        <Flex justifyContent='space-between' gap={5} mt={5}> 
      <FormControl mb={4}>
          <FormLabel>Company Name</FormLabel>
          <Input name="companyName"  placeholder="Enter Company Name" />
      </FormControl>
      <FormControl mb={4}>
          <FormLabel>Contact</FormLabel>
          <Input name="contact"  placeholder="Enter Contact" />
      </FormControl>
      </Flex>
       <Flex justifyContent='space-between' gap={5} mt={3}>
      <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input name="email"  placeholder="Enter Email Id" />
      </FormControl>
      {/* <FormControl mb={4}>
          <FormLabel>Company Name</FormLabel>
          <Input name="companyName"  placeholder="Enter Company Name" />
      </FormControl> */}
      <FormControl mb={4}>
          <FormLabel>Source</FormLabel>
          <Input name="source"  placeholder="Enter Source" />
      </FormControl>
      </Flex>
       <Flex justifyContent='space-between' gap={5} mt={3}>
      <FormControl mb={4}>
          <FormLabel>Assigned To</FormLabel>
          <Input name="assignedto"   />
      </FormControl>
       </Flex>                    
      </Box>
      <Box>
        <Flex justify='center' gap={4}>
           <Button style={{ backgroundColor: "#D32F2F", color: "white" }} mr={3} >
              Cancel
            </Button>
        <Button  style={{ backgroundColor: "#0052CC", color: "white" }}>
          <AddIcon color="#FFFFFF" mr={2} />
           Add
          </Button>
          </Flex>        
      </Box>
    </MyDiv>
  )
}
export default LeadListModal;