import { useTranslation } from "react-i18next";
import { BookmarkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { DappData } from "./DappItem";
import { useState } from "react";

interface FavoriteItemProps {
  dapp: DappData;
  deleteFavorite: (id: string) => void;
}

const wait = () => new Promise((resolve) => setTimeout(resolve));

export function FavoriteItem({ dapp, deleteFavorite }: FavoriteItemProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const currentEnv =
    (import.meta.env?.VITE_APP_ENV as string | undefined) ??
    import.meta.env?.MODE ??
    "prod";
  const normalizedEnv = currentEnv.toLowerCase();

  if (
    dapp.env &&
    !dapp.env.some((env) => env.toLowerCase() === normalizedEnv)
  ) {
    return null;
  }

  const handleClick = () => {
    window.open(dapp.link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex gap-2 py-4 border-b-[1px] cursor-pointer">
      <div className="flex flex-1 min-w-0 gap-4" onClick={handleClick}>
        <div className="w-12 h-12 rounded-lg shadow-md overflow-hidden">
          <img
            src={dapp.icon}
            alt={dapp.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold">{dapp.name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {dapp.description}
          </p>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="flex flex-col items-center">
            <BookmarkIcon className="text-gray-400" />
            <p className="text-xs text-gray-400">
              {t("dapp_favorite_delete", {
                defaultValue: "삭제",
              })}
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("dapp_favorite_title", {
                defaultValue: "즐겨찾기",
              })}{" "}
              {t("dapp_favorite_delete", {
                defaultValue: "삭제",
              })}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {t("dapp_favorite_delete_confirm", {
              defaultValue: "이 사이트를 즐겨찾기 목록에서 삭제 하시겠습니까?",
            })}
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                {t("button_cancel", {
                  defaultValue: "취소",
                })}
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => {
                deleteFavorite(dapp.id);
                wait().then(() => setOpen(false));
              }}
            >
              {t("button_confirm", {
                defaultValue: "확인",
              })}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
