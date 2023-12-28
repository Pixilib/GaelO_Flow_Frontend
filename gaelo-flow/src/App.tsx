import { useState } from "react";
import Welcome from "./Welcome";
import "./index.css";
import { Routes, Route } from "react-router-dom";


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
