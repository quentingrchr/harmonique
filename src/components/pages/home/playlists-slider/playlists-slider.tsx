import Link from "next/link";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export interface PlaylistsSliderProps {
  title: string;
  items?: PlaylistItem[];

  isLoading?: boolean;
}

export interface PlaylistItem {
  id: string;
  name: string;
  description?: string;
  img: {
    src: string;
    alt: string;
  };
  url: string;
}
//https://source.unsplash.com/random/200x200

function SliderSkeleton() {
  const numberOfSlides = 20;
  const slides = Array.from({ length: numberOfSlides }, (_, i) => i);
  return (
    <div className="w-screen overflow-hidden flex gap-[10px] pl-[50px] animate-pulse ">
      {slides.map((slide) => (
        <div
          key={slide}
          className="flex flex-col items-center justify-center gap-2 p-3 box-content"
        >
          <div className="flex gap-2 w-[200px] h-[200px] bg-gray-400 rounded-md"></div>
          <div className="flex flex-col gap-2 w-full h-[46px] rounded-md relative">
            <div className="h-[14px] top-[4px] w-2/3 bg-gray-400 rounded-md absolute"></div>
            <div className="w-1/4 h-[10px] bg-gray-400 rounded-md opacity-80 absolute top-[32px]"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PlaylistsSlider({
  title,
  items,
  isLoading,
}: PlaylistsSliderProps) {
  if (!isLoading && (!items || items.length === 0)) return null;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-start items-center max-w-[1000px] ml-12">
        <h3 className="text-4xl relative w-auto font-semibold">
          <span className="relative z-10">{title}</span>
          <span className="absolute h-3 w-7 bg-brand -bottom-0.5 -left-1 z-0"></span>
        </h3>
      </div>
      {isLoading && <SliderSkeleton />}

      {items && items.length > 0 && (
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          className="w-screen overflow-hidden flex h-auto select-none"
          slidesOffsetBefore={50}
          slidesOffsetAfter={50}
        >
          {items.map((item: PlaylistItem, i) => (
            <SwiperSlide
              key={`playlist-${title}-${item.id}-${i}`}
              className="flex"
              style={{ width: "auto" }}
            >
              <div className="flex justify-center items-center hover:bg-gray-900 group p-3 rounded-md">
                <div className="flex flex-col gap-2 cursor-pointer relative overflow-hidden max-w-[200px]">
                  <Link
                    className="absolute top-0 left-0 bottom-0 right-0 w-full h-full opacity-0 z-20"
                    href={`/collection/playlist/${item.id}`}
                  ></Link>
                  <div className="w-[200px] h-[200px] bg-gray-400 rounded-md overflow-hidden">
                    <img
                      src={item.img.src}
                      alt={item.img.alt}
                      className="w-[200px] h-[200px] object-cover transition-all duration-100 rounded-md group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col w-full overflow-hidden text-ellipsis gap-0.5 min-h-[46px]">
                    <p className="text-white text opacity-9 whitespace-nowrap w-full text-ellipsis overflow-hidden">
                      {item.name}
                    </p>
                    {item.description && (
                      <p className="text-white text-sm opacity-60 whitespace-nowrap w-full text-ellipsis overflow-hidden">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
