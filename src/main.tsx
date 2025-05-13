import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ToastContainer from "../src/ui/toast/ToastContainer.tsx";
import './i18n.ts'
import { store } from "./store.tsx";
import App from "./App.tsx";
import ErrorBoundary from "./ErrorBoundary.tsx";
import "./index.css";
import ConfirmContextProvider from "./services/ConfirmContextProvider.tsx";
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import '@floating-ui/react';

const EmotionCacheProvider = ({ children }: { children: React.ReactNode }) => {
  const cache = React.useMemo(
    () =>
      createCache({
        key: 'with-tailwind',
        insertionPoint: document.querySelector('title')!,
      }),
    []
  );

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

const queryClient = new QueryClient();

let router = createBrowserRouter([
  {
    path: '/*',
    element: (
      <App />
    )
  }
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={<>Error</>}>
        <QueryClientProvider client={queryClient}>
          <ConfirmContextProvider>
            <EmotionCacheProvider>
              <RouterProvider router={router} />
            </EmotionCacheProvider>
          </ConfirmContextProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
        <ToastContainer />
      </ErrorBoundary>
    </Provider>
);
