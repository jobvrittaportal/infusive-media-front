import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import App from "./App";
import theme from "./common/config/theme";
import client from "./common/config/client";
import './index.css';
import { AuthProvider } from "./common/context/AuthContext";

const root = createRoot(document.getElementById("root") as HTMLElement);

const RootApp = () => (
  <ApolloProvider client={client}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </ApolloProvider>
);

if (process.env.NODE_ENV === "development") {
  root.render(
    <React.StrictMode>
      <RootApp />
    </React.StrictMode>
  );
} else {
  root.render(<RootApp />);
}
