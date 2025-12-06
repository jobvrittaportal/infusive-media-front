import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, FormControl, FormLabel, Input, Textarea, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Checkbox, SimpleGrid, } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import * as routesNames from '../../../constant/routes'
import MyDiv from './newRole.style';
import { CustomButton, CustomToast } from '../../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { IRoleForm } from './model';
import { useFetch } from '../../../hooks/useFetch';
import { IPage } from '../pages/model';
import { IRole } from '../roles/model';

const NewRole = () => {
  const { addToast } = CustomToast();
  const { fetchApi, loading } = useFetch(addToast);
  const [pagePermission, setPagePermission] = useState<IPage[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { role, isEditing }: { role: IRole, isEditing: boolean } = location.state || {};

  const [formData, setFormData] = useState<IRoleForm>({
    name: '',
    permissions: []
  });

  const loadPagePermissions = async (roleId: number) => {
    const permissions = await fetchApi<IPage[]>(`page/permission/${roleId}`, 'GET');
    if (permissions) {
      setPagePermission(permissions);
    }
  }

  useEffect(() => {
    setFormData({
      id: role?.id,
      name: role?.name || '',
      description: role?.description,
      permissions: pagePermission
    });
  }, [pagePermission]);

  useEffect(() => {
    if (isEditing && role) {
      loadPagePermissions(role.id);
    }
  }, [role, isEditing]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePermission = (pageId: number, featureId?: number) => {
    if (featureId) {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions?.map(page =>
          page.id === pageId
            ? {
              ...page, features: page.features?.map(feature =>
                feature.id === featureId
                  ? { ...feature, permission: !feature.permission }
                  : feature
              )
            }
            : page
        )
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions?.map(page =>
          page.id === pageId
            ? { ...page, permission: !page.permission }
            : page
        )
      }));
    }
  };

  const isSomeFeaturesSelected = (pageId: number) => {
    const page = pagePermission.find(p => p.id === pageId);
    if (!page) return false;
    const hasSome = page.features?.some(feature =>
      formData.permissions?.find(p => p.id === feature.id)?.permission
    );
    return hasSome;
  };

  const handleSubmit = async () => {

    try {
      const payload: { id: number, name: string, description?: string, permissions: { pageId: number, permission: boolean }[] } =
      {
        id: formData.id || 0,
        name: formData.name,
        description: formData.description,
        permissions: []
      };

      formData.permissions?.forEach(page => {
        payload.permissions.push({
          pageId: page.id,
          permission: page.permission
        });
        page.features?.forEach(feature => {
          payload.permissions.push({
            pageId: feature.id,
            permission: feature.permission
          });
        });
      });

      if (isEditing && formData.id) {
        const response = await fetchApi(`page/permission/${formData.id}`, 'PUT', payload, null, 'Role updated successfully');
        if (response) {
          navigate(routesNames.ROLES);
        }
      } else {
        const response = await fetchApi('role', 'POST', payload, null, 'Role created successfully');
        if (response) {
          navigate(routesNames.ROLES);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <MyDiv>
      <Box ml={3}>
        <Flex className="page_heading">
          <Breadcrumb spacing="5px" className="font_poppins text_md text_medium" separator=">>">
            <BreadcrumbItem>
              <BreadcrumbLink href={routesNames.ROLES} color="gray.500">Roles</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{isEditing ? 'Edit Role' : 'Add New Role'}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex gap={4} ml={'auto'}>
            <CustomButton title="Cancel" className='btn font-poppins text_sm text_medium' onClick={() => navigate(routesNames.ROLES)} isDisabled={loading} />
            <CustomButton title={isEditing ? "Update" : "Submit"} className='btn_theme font-poppins text_sm text_medium' onClick={handleSubmit} isLoading={loading} />
          </Flex>
        </Flex>

        <FormControl mt={6} p={4} bg="white" borderRadius="10px" boxShadow="sm">
          {/* Role Name */}
          <FormLabel mb={1} className="font_poppins text_md text_medium">Role Name</FormLabel>
          <Input
            placeholder="Enter Role Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="font_poppins text_regular text_sm"
            height="45px"
            borderRadius="8px"
            borderColor="#CFCFCF"
            _focus={{ borderColor: "#0052CC", boxShadow: "0 0 0 1px #0052CC" }}
          />

          {/* Role Description */}
          <FormLabel mt={5} mb={1} className="font_poppins text_md text_medium">Role Description</FormLabel>
          <Textarea
            placeholder="Enter Role Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="font_poppins text_regular text_sm"
            height="110px"
            resize="none"
            borderRadius="8px"
            borderColor="#CFCFCF"
            _focus={{ borderColor: "#0052CC", boxShadow: "0 0 0 1px #0052CC" }}
          />
        </FormControl>


        { isEditing && ( <Text mt={4} className="font_poppins text_md text_medium" textAlign="left">Permissions:</Text> ) }

        <Accordion allowToggle mt={2}>
          {pagePermission.map((page) => (
            <AccordionItem className='accordian' key={page.name} border="none" bg="#F5F5F5" borderRadius="10px" p={2} mb={3}>
              <AccordionButton bg="white" borderRadius="8px" _expanded={{ bg: "white", borderRadius: "8px" }} px={3}>
                <Checkbox colorScheme='blue' size="lg"
                  isChecked={formData.permissions?.some(p => p.id === page.id && p.permission)}
                  onChange={() => togglePermission(page.id)}
                >
                </Checkbox>
                <Text className="font-poppins text_md text_medium" ml={4}>{page.name}</Text>
                <AccordionIcon ml="auto" />
              </AccordionButton>

              <AccordionPanel px={0} pt={3}>
                <SimpleGrid columns={[2, null, 3, 4]} spacing={4}>
                  {page.features?.map((feature) => {
                    const _page = formData.permissions?.find(p => p.id === page.id);
                    const _feature = _page?.features?.find(f => f.id === feature.id);
                    const isSelected = _feature?.permission || false;
                    return (
                      <Box
                        key={feature.id}
                        border="0.5px solid"
                        borderColor={isSelected ? "#0052CC" : "#000000"}
                        borderRadius="8px"
                        px={3}
                        py={2}
                        cursor="pointer"
                        bg={isSelected ? "#0052CC" : "#F5F5F5"}
                        color={isSelected ? "#fff" : "#000"}
                        onClick={() => togglePermission(page.id, feature.id)}
                        className="featureBox font-poppins text_md text_regular"
                      >
                        <Checkbox isChecked={isSelected} colorScheme="blue" size="lg" pointerEvents="none"><Text className="font-poppins text_md text_medium">{feature.name}</Text></Checkbox>
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </MyDiv>
  );
};

export default NewRole;