import { Routes, Route } from "react-router-dom";

import Welcome from "./Welcome";
import LegalMention from "./RootComponents/LegalMentions";
import { ChangePasswordForm } from "./auth/ChangePasswordForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/legal-mention" element={<LegalMention />} />
      <Route path="/confirm" element={<ChangePasswordForm />} />
    </Routes>
  );
}

export default App;
