import { Alert, AlertIcon } from '@chakra-ui/react';
import React from 'react';

const ErrorComponent = (message) => {
  return (
    <Alert status='error' justifyContent={'center'} >
        <AlertIcon>
            {message}
        </AlertIcon>
    </Alert>
  )
}

export default ErrorComponent;