// src/components/ProductBanner.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const productImages = [
    "/image1.webp",
   

];

export default function ProductBanner() {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden flex">

      <div className="absolute z-20 inset-0 flex flex-col text-center px-4 top-20 font-mono">
        <br/>
        <h2 className="text-7xl md:text-3xl font-bold text-primary drop-shadow-md mt-2">
          Crystal Beauty Clear
        </h2>
      </div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {productImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full">
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover brightness-[0.75]" 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
