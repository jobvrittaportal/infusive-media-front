import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import theme from "./common/config/theme";
import client from "./common/config/client";
import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider } from "./common/context/AuthContext";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          {/* Color Mode Script enables light/dark mode preference */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {/* <BrowserRouter> */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
          {/* </BrowserRouter> */}
        </ChakraProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
