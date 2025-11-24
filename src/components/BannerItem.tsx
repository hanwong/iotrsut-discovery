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
    const isWebp = banner.img.includes(".webp");
    return (
      <div
        className="cursor-pointer"
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        <picture>
          {isWebp && <source srcSet={banner.img} type="image/webp" />}
          <img
            src={banner.img}
            alt={banner.title}
            className="w-full h-auto "
            loading="lazy"
          />
        </picture>
      </div>
    );
  }

  const renderIcon = () => {
    if (!banner.bg) return null;

    const isWebp = banner.bg.includes(".webp");

    return (
      <picture>
        {isWebp && <source srcSet={banner.bg} type="image/webp" />}
        <img
          src={banner.bg}
          alt={banner.title}
          className="w-full h-auto"
          loading="lazy"
        />
      </picture>
    );
  };

  // 텍스트 배너 타입
  return (
    <div
      className="relative cursor-pointer overflow-hidden"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {renderIcon()}
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
