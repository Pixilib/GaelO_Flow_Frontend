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
import Home from "./Home";
import General from "./General"

import AuthenticatorRoot from "./RootComponents/AuthenticatorRoot";


import Welcome from "./Welcome";

import LegalMention from "./RootComponents/LegalMentions";

function App() {

  const [displayLegalMention, setDisplayLegalMention] =
    useState<boolean>(false);

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/legal-mention" element={<LegalMention />} />
    </Routes>
  );
}

export default App;
