import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Banner } from "@/components/Banner";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Dapp } from "@/components/Dapp";
import { Favorite } from "@/components/Favorite";

function App() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-start justify-center max-w-xl min-w-md mx-auto relative">
      <main className="flex flex-col items-start w-full">
        <section className="w-full p-2 flex items-center gap-2">
          <Input />
          <LanguageSwitcher />
        </section>
        <section className="w-full">
          <Banner />
        </section>
        <section className="w-full flex flex-col gap-6 p-4">
          <article className="flex flex-col gap-2">
            <h2 className="text-lg border-b-[1px] border-gray-300">
              {t("dapp_favorite_title", { defaultValue: "즐겨찾기" })}
            </h2>
            <Favorite />
          </article>
          <article className="flex flex-col">
            <h2 className="text-lg border-b-[1px] border-gray-300">
              {t("dapp_list_title", { defaultValue: "목록" })}
            </h2>
            <Dapp />
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
