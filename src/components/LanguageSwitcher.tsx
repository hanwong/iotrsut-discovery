import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { EarthIcon } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ko" ? "en" : "ko";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button variant="ghost" className="p-2" onClick={toggleLanguage}>
      <EarthIcon />
    </Button>
  );
}
