import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

interface Props {
  onClick: () => void;
  label?: string;
}

const ActionEditIcon: React.FC<Props> = ({ onClick, label = "Edit" }) => {
  return (
    <Tooltip label={label} hasArrow>
      <IconButton icon={<EditIcon />} onClick={onClick} aria-label={label} variant="ghost" size="sm"/>
    </Tooltip>
  );
};

export default ActionEditIcon;