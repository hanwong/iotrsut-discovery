import { useTranslation } from "react-i18next";
import { XIcon } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface DappData {
  id: string;
  name: string;
  description: string;
  icon: string;
  link: string;
  network?: string[];
  platform?: ("ios" | "android")[];
  env?: ("dev" | "stage" | "prod")[];
}

interface DappItemProps {
  dapp: DappData;
  isSearch: boolean;
}

export function DappItem({ dapp, isSearch }: DappItemProps) {
  const { t } = useTranslation();

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

  const item = () => (
    <div className="flex gap-4 px-2 py-4 border-b-[1px] cursor-pointer">
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
  );

  if (isSearch) {
    return <div onClick={handleClick}>{item()}</div>;
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{item()}</DrawerTrigger>
      <DrawerContent>
        <div className="relative min-h-[50vh] p-6">
          <div className="absolute top-2 right-0">
            <DrawerClose asChild>
              <Button variant="ghost">
                <XIcon />
              </Button>
            </DrawerClose>
          </div>
          <div className=" flex gap-4 pb-2">
            <div className="w-12 h-12 rounded-lg shadow-md overflow-hidden">
              <img
                src={dapp.icon}
                alt={dapp.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{dapp.name}</h3>
              {dapp.network && (
                <div className="flex gap-2 mt-1">
                  {dapp.network.map((net, i) => (
                    <p key={i} className="text-sm text-gray-400 rounded">
                      {net}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="pb-4">
            <p className="text-sm text-muted-foreground">{dapp.link}</p>
          </div>
          <div className="pb-4">
            <h2 className="mb-2">
              {t("dapp_description", { defaultValue: "설명" })}
            </h2>
            <p className="text-sm text-gray-400">{dapp.description}</p>
          </div>
        </div>
        <DrawerFooter>
          <Button className="bg-green-600" onClick={handleClick}>
            {t("go_to_dapp", { defaultValue: "서비스 바로가기" })}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export type { DappData };
