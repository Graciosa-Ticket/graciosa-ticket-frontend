import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../src/routes/Routes";
import GlobalStyle from "./styles/global";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./hooks/auth";
import { ThemeProvider } from "styled-components";
import { themesOptions } from "./styles/theme";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={themesOptions["light"]}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GlobalStyle />
          <Toaster
            richColors
            closeButton
            position="top-right"
            duration={8000}
            toastOptions={{
              style: {
                whiteSpace: "pre-line",
              },
            }}
          />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
