
import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, Select, Text, Textarea } from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';
import MyDiv from './leadListModal.style';


const LeadListModal = () => {
 
  return (
    <MyDiv>
      <Box p={2} maxH="70vh" overflowY='scroll'>
      <Text className="font-poppins font_dark text_semibold text_3xl"> Add New Lead</Text>
      <Text className="font-poppins  text_regular text_md"> Enter the lead and company information below</Text>
      <Text className="font-poppins  text_medium text_xl" mt={3}>  company Information </Text>
     
     <Divider mt={1}/>
      <Box textAlign='left'className="font-poppins  text_regular text_xsm">
        <Flex justifyContent='space-between' gap={5} mt={5}> 
      <FormControl mb={4}>
          <FormLabel>Company Name</FormLabel>
          <Input name="companyName"  placeholder="Enter Company Name" />
      </FormControl>
      <FormControl mb={4}>
          <FormLabel>Website</FormLabel>
          <Input name="website"  placeholder="https://example.com" />
      </FormControl>
      </Flex>
       <Flex justifyContent='space-between' gap={5} mt={3}>
      <FormControl mb={4}>
          <FormLabel>Company Phone</FormLabel>
          <Input name="phone"  placeholder="+1 234 567 8900" />
      </FormControl>
      <FormControl mb={4}>
          <FormLabel>Industry</FormLabel>
          <Select placeholder='Select industry'>
            <option value='option1'>Technology</option>
            <option value='option2'>HealthCare</option>
            <option value='option3'>Finance</option>
            <option value='option3'>Retail</option>
            <option value='option3'>Other</option>
          </Select>
      </FormControl>
      </Flex>
       <Flex justifyContent='space-between' gap={5} mt={3}>
      <FormControl mb={4}>
          <FormLabel>Company Address</FormLabel>
          <Input name="Enter Full address"   />
      </FormControl>
       </Flex> 

       <Text className="font-poppins  text_medium text_xl" mt={3}> Point of Contact (POC) </Text>
     
     <Divider mt={1}/>
      <Box textAlign='left'className="font-poppins  text_regular text_xsm">
        <Flex justifyContent='space-between' gap={5} mt={5}> 
      <FormControl mb={4}>
          <FormLabel>Contact Name</FormLabel>
          <Input name="contactName"  placeholder="Enter Contact Name" />
      </FormControl>
      <FormControl mb={4}>
          <FormLabel>Position</FormLabel>
          <Input name="position"  placeholder="CEO, Marketing, Maneger, etc." />
      </FormControl>
      </Flex>
       <Flex justifyContent='space-between' gap={5} mt={3}>
      <FormControl mb={4}>
          <FormLabel> Contact Email</FormLabel>
          <Input name="email"  placeholder="Enter Email" />
      </FormControl>
      <FormControl mb={4}>
          <FormLabel>Contact Phone</FormLabel>
          <Input name="industry"  placeholder='+1 234 567 8900' />
      </FormControl>
      </Flex> 
      </Box>

      <Text className="font-poppins  text_medium text_xl" mt={3}> Lead Details </Text>
     <Divider mt={1}/>
      <Box textAlign='left'className="font-poppins  text_regular text_xsm">
        <Flex justifyContent='space-between' gap={5} mt={5}> 
      <FormControl mb={4}>
          <FormLabel>Lead Source</FormLabel>
           <Select placeholder='Select Source'>
            <option value='option1'>Facebook</option>
            <option value='option2'>Linkedin</option>
            <option value='option3'>Referral</option>
            <option value='option3'>Retail</option>
            <option value='option3'>Website</option>
          </Select>
      </FormControl>
      <FormControl mb={4}>
          <FormLabel>Status</FormLabel>
           <Select placeholder='Select Status'>
            <option value='option1'>New</option>
            <option value='option2'>Assigned</option>
            <option value='option3'>Researched</option>
            <option value='option3'>Quoted</option>
            <option value='option3'>Closed</option>
          </Select>
      </FormControl>
      </Flex>
       <Flex justifyContent='space-between' gap={5} mt={3}>
      <FormControl mb={4}>
          <FormLabel>Assign To</FormLabel>
           <Select placeholder='Select team member'>
            <option value='option1'>Sarah M.</option>
            <option value='option2'>Shreya S.</option>
            <option value='option3'>Radhika N.</option>
            <option value='option3'>Uday P.</option>
            <option value='option3'>Uttam K.</option>
          </Select>
      </FormControl>
      <FormControl mb={4}>
          <FormLabel>Estimated Budget</FormLabel>
          <Input name="industry"  type='number' />
      </FormControl>
      </Flex>
      <FormControl mb={4}>
          <FormLabel>Notes</FormLabel>
          <Textarea/>
      </FormControl>
      </Box>                 
      </Box>
      <Box>
        <Flex justify='center' gap={4}>
           <Button variant="ghost" mr={3} >
              Cancel
            </Button>
        <Button  style={{ backgroundColor: "#0052CC", color: "white" }}>
          <AddIcon color="#FFFFFF" mr={2} />
           Add
          </Button>
          </Flex>        
      </Box>
      </Box>
    </MyDiv>
  )
}
export default LeadListModal;