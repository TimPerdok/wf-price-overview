import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import PageContainer from "./components/layout/PageContainer.tsx";
import { ToastProvider } from "./components/toast/ToastProvider.tsx";
import EnvConfig from "./EnvConfig.ts";
import Home from "./pages/Home.tsx";
import theme from "./Theme.ts";
import { Route as RouteClass } from "./types/Route.ts";
import ItemPage from "./pages/item/ItemPage.tsx";

export const ALL_ROUTES = {
  HOME: new RouteClass("HOME", "/", <Home />),
  ITEM: new RouteClass("ITEM", "/item/:urlName", <ItemPage />),
}

console.log(Object.entries(ALL_ROUTES).map(([key, value]) => `${key}: ${value.path}`));

function App(): React.ReactElement {
  return (
    <PageContainer>
      <ThemeProvider theme={theme}>
        <SCThemeProvider theme={theme}>
          <ToastProvider>
            <HashRouter>
              <Routes>
                {
                  Object.values(ALL_ROUTES).map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                  ))
                }
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
