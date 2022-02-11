import { t } from "@lingui/macro";
import { useLanguage } from "../context/LanguageContext";
import { Language } from "../i18n";

export default function LangSwitcher() {
  const { language, changeLanguage } = useLanguage();

  const languages: { [k in Language]: string } = {
    en: t`English`,
    vi: t`Vietnamese`,
  };

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
      {Object.keys(languages).map((language) => (
        <option key={language} value={language}>
          {languages[language as Language]}
        </option>
      ))}
    </select>
  );
}
