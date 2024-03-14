import i18n from "i18next";
import enJSON from './locale/en.json'
import frJSON from './locale/fr.json'
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enJSON
      },
      fr: {
        translation: frJSON
      },
    },
    lng: "en",
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false, 
    },
    debug: true,
  });
  

export default i18n;