import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../src/routes/Routes";
import GlobalStyle from "./styles/global";
import { AuthProvider } from "./hooks/auth";
import { ThemeProvider } from "styled-components";
import { themesOptions } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={themesOptions["light"]}>
      <AuthProvider>
        <GlobalStyle />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
