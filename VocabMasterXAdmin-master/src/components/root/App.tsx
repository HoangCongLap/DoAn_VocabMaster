import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '~/components/contexts/UserContext';
import Main from '~/components/root/Main';
import { ChakraProvider } from '@chakra-ui/react';

export const App = () => {
  return (
    <HelmetProvider>
      <ChakraProvider>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </ChakraProvider>
    </HelmetProvider>
  );
};
