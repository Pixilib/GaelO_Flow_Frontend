import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import Welcome from "./Welcome";
import "./index.css";
import Button from "./RenderComponents/Button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "./store";


const queryClient = new QueryClient();

function App() {
  // Fonction à appeler en cas d'erreur
  const handleError = (error, errorInfo) => {
    // Logique de gestion d'erreurs (par exemple, envoi à un service de suivi des erreurs)
    console.error("Erreur interceptée par ErrorBoundary", error, errorInfo);
  };

  // Composant à afficher en cas d'erreur
  const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <div role="alert">
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Réessayer</button>
    </div>
  );

  const [displayLegalMention, setDisplayLegalMention] =
    useState<boolean>(false);

  return (
    <Provider store={store}>
      <QueryClientProvider 
      client={queryClient}
      >
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
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
