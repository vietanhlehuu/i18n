import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Language } from "../i18n";

const Switcher: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  const handleChangeLanguage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const language = event.target.value as Language;
    changeLanguage(language);
  };

  return (
    <select
      className="relative z-30"
      value={language}
      onChange={handleChangeLanguage}
    >
      <option value={"en"}>English</option>
      <option value={"vi"}>Vietnamese</option>
    </select>
  );
};

export default Switcher;
