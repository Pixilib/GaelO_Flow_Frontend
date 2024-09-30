import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
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


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={<>Error</>}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ConfirmContextProvider>
              <EmotionCacheProvider>
                <App />
              </EmotionCacheProvider>
            </ConfirmContextProvider>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
        <ToastContainer />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
