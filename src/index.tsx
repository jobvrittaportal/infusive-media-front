import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './views/App/App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './hooks/useAuth';


const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(

    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}


reportWebVitals(console.log); 