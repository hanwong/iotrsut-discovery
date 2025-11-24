import { Button } from "@/components/ui/button";

export interface BannerData {
  title: string;
  img?: string;
  description?: string;
  link: string;
  cta?: string;
  bg?: string;
}
interface BannerItemProps {
  banner: BannerData;
}

export function BannerItem({ banner }: BannerItemProps) {
  const handleClick = () => {
    window.open(banner.link, "_blank", "noopener,noreferrer");
  };

  if (banner.img) {
    // 이미지 배너 타입
    return (
      <div
        className="cursor-pointer"
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        <img src={banner.img} alt={banner.title} className="w-full h-auto" />
      </div>
    );
  }

  // 텍스트 배너 타입
  return (
    <div
      className="relative cursor-pointer overflow-hidden"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {banner.bg && (
        <img src={banner.bg} alt={banner.title} className="w-full h-auto" />
      )}
      <div className="absolute inset-0 flex flex-col justify-center items-start p-6">
        {banner.description && (
          <p className="text-white/90 text-xl mb-8">{banner.description}</p>
        )}
        {banner.cta && (
          <Button variant="secondary" className="rounded-3xl">
            {banner.cta}
          </Button>
        )}
      </div>
    </div>
  );
}
