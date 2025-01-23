import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { AuthProvider } from "./hooks/auth.tsx";
import { client } from "./apollo/client.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);
