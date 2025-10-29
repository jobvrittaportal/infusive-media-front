import React from "react";
import { Box, Checkbox, Stack, Text } from "@chakra-ui/react";
import { IRolePermission, PermissionAction } from "./helpers";
import { FeatureTree } from "../../common/utils/permission";

interface Props {
  value: IRolePermission[];
  onChange: (value: IRolePermission[]) => void;
}

const PermissionTree: React.FC<Props> = ({ value, onChange }) => {
  const toggle = (feature: string, action: PermissionAction) => {
    const existing = value.find((p) => p.feature === feature);
    if (existing) {
      const updated = {
        ...existing,
        permissions: {
          ...existing.permissions,
          [action]: !existing.permissions[action],
        },
      };
      onChange(value.map((p) => (p.feature === feature ? updated : p)));
    } else {
      onChange([...value, { feature, permissions: { [action]: true } }]);
    }
  };

  const isChecked = (feature: string, action: PermissionAction) =>
    !!value.find((p) => p.feature === feature)?.permissions[action];

  return (
    <Box borderWidth="1px" borderRadius="md" p={3}>
      {FeatureTree.map((mod) => (
        <Box key={mod.name} mb={3}>
          <Text fontWeight="bold">{mod.label}</Text>
          <Stack pl={4}>
            {mod.permissions?.map((p) => (
              <Checkbox
                key={p}
                isChecked={isChecked(mod.name, p)}
                onChange={() => toggle(mod.name, p)}
              >
                {p}
              </Checkbox>
            ))}
            {mod.features?.map((f) => (
              <Box key={f.name} pl={4}>
                <Text>{f.label}</Text>
                {f.permissions?.map((p) => (
                  <Checkbox
                    key={p}
                    isChecked={isChecked(f.name, p)}
                    onChange={() => toggle(f.name, p)}
                  >
                    {p}
                  </Checkbox>
                ))}
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default PermissionTree;
