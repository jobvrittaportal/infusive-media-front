import { useToast } from '@chakra-ui/react';

type ToastStatus = 'info' | 'warning' | 'success' | 'error' | 'loading';

export interface AddToastProps {
  message: string;
  status: ToastStatus;
}

export default function useCustomToast() {
  const toast = useToast();

  const addToast = ({ message, status }: AddToastProps): void => {
    toast({
      position: 'top-right', 
      title: message,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  return { addToast };
}
