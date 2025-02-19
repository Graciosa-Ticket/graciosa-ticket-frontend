import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import AppRoutes from "../src/routes/Routes";
import GlobalStyle from "./styles/global";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./hooks/auth";
import { themesOptions } from "./styles/theme";
import { useDarkMode } from "./hooks/theme";
import * as Tooltip from "@radix-ui/react-tooltip";

const queryClient = new QueryClient();

function App() {
  const { theme } = useDarkMode();

  return (
    <ThemeProvider theme={themesOptions[theme] as any}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GlobalStyle />
          <Toaster
            richColors
            closeButton
            position="bottom-left"
            duration={8000}
          />
          <Tooltip.Provider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </Tooltip.Provider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
