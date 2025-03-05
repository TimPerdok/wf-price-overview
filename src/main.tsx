import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { ToastProvider } from "./components/toast/ToastProvider.tsx";
import PageContainer from "./components/layout/PageContainer.tsx";
import Home from "./pages/Home.tsx";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(134, 203, 146)",
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
    background: {
      default: "rgb(28, 28, 28)",
      paper: "rgb(28, 28, 28)",
    },
    secondary: {
      main: "#e45456",
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
  },
});

export const ROUTES = {
  HOME: {
    path: "/",
    element: <Home />,
  },
};


function App(): React.ReactElement {
  return (
    <PageContainer>
      <ThemeProvider theme={theme}>
        <SCThemeProvider theme={theme}>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                {
                  Object.values(ROUTES).map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                  ))
                }
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </SCThemeProvider>
      </ThemeProvider>
    </PageContainer>

  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);
