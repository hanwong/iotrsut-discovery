import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { DappItem, type DappData } from "./DappItem";

export interface DappJson {
  dapp_list: {
    en: DappData[];
    ko: DappData[];
  };
}

const dappUrl = import.meta.env?.VITE_DAPP_URL ?? "/data/dapp.json";

export function Dapp() {
  const { t, i18n } = useTranslation();
  const [dapps, setDapps] = useState<DappData[]>([]);
  const [search, setSearch] = useState<string>("");
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

  const filteredDapps = useMemo(() => {
    if (!dapps.length) return [];

    if (search) {
      return dapps.filter(
        ({ name, description }) =>
          name.includes(search) || description.includes(search)
      );
    }
  }, [dapps, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!dapps.length) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">
          {t("empty_data", { defaultValue: "등록된 데이터가 없습니다." })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="py-2">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("search", {
            defaultValue: "검색어를 입력하세요.",
          })}
        />
      </div>
      {search &&
        filteredDapps &&
        filteredDapps.map((dapp, index) => (
          <DappItem key={index} dapp={dapp} isSearch={!!search} />
        ))}
      {!search &&
        dapps.map((dapp, index) => (
          <DappItem key={index} dapp={dapp} isSearch={!!search} />
        ))}
    </div>
  );
}
