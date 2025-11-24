import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Banner } from "@/components/Banner";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Dapp } from "@/components/Dapp";

function App() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-start justify-center max-w-xl min-w-md mx-auto relative">
      <main className="flex flex-col items-start w-full">
        <section className="w-full p-2 flex items-center gap-2">
          <Input
            placeholder={t("search", {
              defaultValue: "검색어 또는 URL을 입력하세요.",
            })}
          />
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
            <div className="flex flex-col">
              <div>즐겨찾기 1</div>
              <div>즐겨찾기 2</div>
            </div>
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
