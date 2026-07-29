import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locals/en.json";
import hi from "../locals/hi.json";
import fr from "../locals/fr.json";
import ar from '../locals/ar.json';

const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      fr: { translation: fr },
      ar: { translation: ar },
    },

    lng: savedLanguage,

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

const rtlLanguages = ["ar"];

const updateDirection = (lng: string) => {
  document.documentElement.lang = lng;

  document.documentElement.dir = rtlLanguages.includes(lng)
    ? "rtl"
    : "ltr";
};

updateDirection(savedLanguage);

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);

  updateDirection(lng);
});

export default i18n;