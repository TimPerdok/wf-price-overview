import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import PageContainer from "./components/layout/PageContainer.tsx";
import { ToastProvider } from "./components/toast/ToastProvider.tsx";
import EnvConfig from "./EnvConfig.ts";
import Home from "./pages/Home.tsx";
import ItemPage from "./pages/ItemPage.tsx";
import type { Route as RouteType } from "./types/Route.ts";

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
      default: "rgb(25, 25, 25)",
      paper: "rgb(25, 25, 25)",
    },
    secondary: {
      main: "#e45456",
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: "8px"
        },
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
  },
});



export const ALL_ROUTES = {
  HOME: {
    path: "/",
    element: <Home />,
    createUrl: (urlName: string) => `/`,
  } as RouteType<"/">,
  ITEM: {
    path: "/item/:urlName",
    element: <ItemPage />,
    createUrl: (urlName: string) => `/item/${urlName}`,
  } as RouteType<"/item/:urlName">,
} as const;


function App(): React.ReactElement {
  return (
    <PageContainer>
      <ThemeProvider theme={theme}>
        <SCThemeProvider theme={theme}>
          <ToastProvider>
            <BrowserRouter basename={EnvConfig.basename}>
              <Routes>
                {
                  Object.values(ALL_ROUTES).map((route) => (
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
