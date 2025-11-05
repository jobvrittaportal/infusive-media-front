import React from "react";
import {
  Box,
  Checkbox,
  Flex,
  Grid,
  Text,
  Divider,
} from "@chakra-ui/react";
import { IRolePermission, PermissionAction } from "./helpers";
import { FeatureTree } from "../../common/utils/permission";

interface Props {
  value: IRolePermission[] | undefined;
  onChange: (value: IRolePermission[]) => void;
}

const PermissionTree: React.FC<Props> = ({ value, onChange }) => {
  const toggle = (feature: string, action: PermissionAction) => {
    const existing = value?.find((p) => p.feature === feature);
    if (existing) {
      const updated = {
        ...existing,
        permissions: {
          ...existing.permissions,
          [action]: !existing.permissions[action],
        },
      };
     value && onChange(value.map((p) => (p.feature === feature ? updated : p)));
    } else {
     value && onChange([...value, { feature, permissions: { [action]: true } }]);
    }
  };

  const isChecked = (feature: string, action: PermissionAction) =>
    !!value?.find((p) => p.feature === feature)?.permissions[action];

  return (
    <Box >
      <Text fontWeight="semibold" mb={2}>
        Permissions
      </Text>
      <Box borderWidth="1px" borderRadius="md" overflow="hidden" gap={5}>
        <Flex
          bg="gray.50"
          py={2}
          px={4}
          justify="space-between"
          align="center"
          fontWeight="semibold"
        >
          <Box flex="1">Features</Box>
          <Flex flex="2" justify="space-between">
            <Checkbox>Select All</Checkbox>
            <Checkbox>Select All</Checkbox>
            <Checkbox>Select All</Checkbox>
          </Flex>
        </Flex>

        <Divider />
        <Box p={4} maxH="380px" overflowY="auto">
          {FeatureTree.map((feature) => (
            <>
            <Box key={feature.name} mb={3}>
              <Grid templateColumns="1fr 2fr" alignItems="center" gap={5}>
                <Text className="font-poppins text_lg text_semibold">{feature.label}</Text>
                <Flex justify="space-between">
                  {feature.permissions?.map((perm) => (
                    <Checkbox
                      key={perm}
                      isChecked={isChecked(feature.name, perm)}
                      onChange={() => toggle(feature.name, perm)}
                      className="font-poppins text_regular text_lg"
                    >
                      {perm}
                    </Checkbox>
                  ))}
                </Flex>
              </Grid>

           
              {feature.features?.map((sub) => (
                <Grid
                  key={sub.name}
                  templateColumns="1fr 2fr"
                  alignItems="center"
                  mt={2}
                  pl={6}
                >
                  <Text className="font-poppins text_medium text_md">{sub.label}</Text>
                  <Flex justify="space-between">
                    {sub.permissions?.map((perm) => (
                      <Checkbox
                        key={perm}
                        isChecked={isChecked(sub.name, perm)}
                        onChange={() => toggle(sub.name, perm)}
                        className="font-poppins text_regular text_lg"
                      >
                        {perm}
                      </Checkbox>
                    ))}
                  </Flex>
                </Grid>
              ))}
            </Box>
            <Divider mb={2}/>
            </>
          ))}
          
        </Box>
      </Box>
    
      
    </Box>
  );
};

export default PermissionTree;
