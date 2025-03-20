import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import PageContainer from "./components/layout/PageContainer.tsx";
import { ToastProvider } from "./components/toast/ToastProvider.tsx";
import EnvConfig from "./EnvConfig.ts";
import Home from "./pages/Home.tsx";
import ItemPage from "./pages/ItemPage.tsx";
import type { Route as RouteType } from "./types/Route.ts";
import theme from "./Theme.ts";

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
            <HashRouter basename={EnvConfig.basename}>
              <Routes>
                {
                  Object.values(ALL_ROUTES).map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                  ))
                }
                <Route
                  path="*"
                  element={<Navigate to="/" replace={true} />}
                />
              </Routes>
            </HashRouter>
          </ToastProvider>
        </SCThemeProvider>
      </ThemeProvider>
    </PageContainer>

  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);
