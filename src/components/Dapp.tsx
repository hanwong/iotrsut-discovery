import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DappItem, type DappData } from "./DappItem";

interface DappJson {
  dapp_list: {
    en: DappData[];
    ko: DappData[];
  };
}

const dappUrl = import.meta.env?.VITE_DAPP_URL ?? "/data/dapp.json";

export function Dapp() {
  const { i18n } = useTranslation();
  const [dapps, setDapps] = useState<DappData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDapps = async () => {
      try {
        const response = await fetch(dappUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch dapp data");
        }
        const data: DappJson = await response.json();
        const currentLang = i18n.language === "ko" ? "ko" : "en";
        setDapps(data.dapp_list[currentLang] || []);
      } catch (error) {
        console.error("Error fetching dapp data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDapps();
  }, [i18n.language]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {dapps.map((dapp, index) => (
        <DappItem key={index} dapp={dapp} />
      ))}
    </div>
  );
}
