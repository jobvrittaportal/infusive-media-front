import {AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,Button,Box,Divider,} from '@chakra-ui/react';
import { useRef } from 'react';
import MyDiv from './alertCard.style';

interface StatusChangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  colorScheme?: string;
}

const AlertCard: React.FC<StatusChangeDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Update Status',
  description = 'Are you sure want to change employee status',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  colorScheme = 'blue',
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <MyDiv>
      <Box>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
          <AlertDialogOverlay>
            <AlertDialogContent width="280px" borderRadius="xl" py={4} px={5} textAlign="center" className='font-poppins text_sm text_medium'>
              <AlertDialogHeader fontSize="md" fontWeight="medium" p={0}>{title}</AlertDialogHeader>
              <Divider my={3} />
              <AlertDialogBody className='font-poppins text_md text_medium ' mb={4}>{description}</AlertDialogBody>
              <AlertDialogFooter justifyContent="center" gap={4} p={0}>
                <Button colorScheme={colorScheme} px={6} className='font-poppins text_md text_medium ' borderRadius="md" fontWeight="medium" onClick={onConfirm}>{confirmLabel}</Button>
                <Button className='font-poppins text_md text_medium ' variant="ghost" ref={cancelRef} onClick={onClose} fontWeight="medium">{cancelLabel}</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </MyDiv>
  );
};

export default AlertCard;
