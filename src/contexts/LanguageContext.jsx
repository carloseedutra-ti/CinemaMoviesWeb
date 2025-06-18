import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("pt-BR");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("app_language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("app_language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
