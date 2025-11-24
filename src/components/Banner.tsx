import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Autoplay from "embla-carousel-autoplay";

import {
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Carousel } from "@/components/ui/carousel";
import { BannerItem, type BannerData } from "./BannerItem";

interface BannerJson {
  banner_list: {
    en: BannerData[];
    ko: BannerData[];
  };
}

const bannerUrl = import.meta.env?.VITE_BANNER_URL ?? "/data/banner.json";

export function Banner() {
  const { i18n } = useTranslation();
  const plugin = useRef(Autoplay({ delay: 5000 }));

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(bannerUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch banner data");
        }
        const data: BannerJson = await response.json();
        const currentLang = i18n.language === "ko" ? "ko" : "en";
        setBanners(data.banner_list[currentLang] || []);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [i18n.language]);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-200">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <BannerItem banner={banner} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-4 right-6 text-white text-sm">
        {current} / {count}
      </div>
    </div>
  );
}
