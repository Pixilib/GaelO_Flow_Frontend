import { useSelector } from "react-redux";
import WelcomeRoot from "./welcome/WelcomeRoot";
import { RootState } from "./store";
import RootApp from "./root/RootApp";
import "./index.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const [selectLanguage, setLanguageSelect] = useState<string>('English');

  const changeLanguage = (lang: string) => {
    const lg = lang === "English" ? "en" : "fr";
    console.log({ lg , lang })
    i18n.changeLanguage(lg);
    setLanguageSelect(lang);
  }

  return (
    <div className="h-screen w-screen">
      {isLogged ? <RootApp language={selectLanguage} setLanguageSelect={changeLanguage} /> : <WelcomeRoot />}
    </div>
  )
}

export default App;
