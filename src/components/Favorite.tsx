import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FavoriteItem } from "./FavoriteItem";
import { type DappData } from "./DappItem";

export interface DappJson {
  dapp_list: {
    en: DappData[];
    ko: DappData[];
  };
}

const favoriteUrl = import.meta.env?.VITE_FAVORITE_URL ?? "/data/favorite.json";

export function Favorite() {
  const { t, i18n } = useTranslation();
  const [dapps, setDapps] = useState<DappData[]>([]);
  const [deletedFavorites, setDeletedFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDapps = async () => {
      try {
        const response = await fetch(favoriteUrl);
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

  const favorites = useMemo(() => {
    if (!deletedFavorites.length) return dapps;

    return dapps.filter(({ id }) => !deletedFavorites.includes(id));
  }, [dapps, deletedFavorites]);

  const deleteFavorite = useCallback((id: string) => {
    setDeletedFavorites((curr) => [id, ...curr]);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!favorites.length) {
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
      {favorites.map((dapp, index) => (
        <FavoriteItem key={index} dapp={dapp} deleteFavorite={deleteFavorite} />
      ))}
    </div>
  );
}
