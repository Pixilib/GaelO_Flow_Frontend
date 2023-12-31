import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Welcome from "./Welcome";
import "./index.css";
import Button from "./RenderComponents/Button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "./store";
import ErrorBoundary from "./ErrorBoundary";


const queryClient = new QueryClient();

function App() {

  const [displayLegalMention, setDisplayLegalMention] =
    useState<boolean>(false);

  return (
    <Provider store={store}>
      <QueryClientProvider
        client={queryClient}
      >
        <ErrorBoundary FallbackComponent={<>Error</>}>
          <BrowserRouter>
            <Routes>
              <Route

                path="/legal-mention"
                element={
                  <>
                    <Button
                      onClick={() => setDisplayLegalMention(false)}
                      color="purple"
                    >
                      Return to Main
                    </Button>{" "}
                    "Legal Mention"
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <Welcome onLegalMention={() => setDisplayLegalMention(true)} />
                }
              />
            </Routes>
            {displayLegalMention && <Button onClick={() => setDisplayLegalMention(false)} color="purple">Return to Main</Button>}
          </BrowserRouter>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
