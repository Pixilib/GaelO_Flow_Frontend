import { Routes, Route } from "react-router-dom";

import Welcome from "./Welcome";

import LegalMention from "./RootComponents/LegalMentions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/legal-mention" element={<LegalMention />} />
    </Routes>
  );
}

export default App;
