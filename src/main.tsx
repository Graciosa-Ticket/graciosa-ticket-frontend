import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DarkModeProvider } from "./hooks/theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </React.StrictMode>
);
