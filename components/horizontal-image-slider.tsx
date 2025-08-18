"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SliderImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

const sliderImages: SliderImage[] = [
  {
    id: "1",
    src: "/images/featured-album/1.jpg",
    alt: "OKAMA performing live on stage with traditional instruments",
    title: "LIVE IN CONCERT",
    subtitle: "Sacred music meets modern stage",
  },
  {
    id: "2",
    src: "/images/featured-album/2.jpg",
    alt: "Band members in traditional indigenous regalia",
    title: "SACRED TRADITIONS",
    subtitle: "Honoring our ancestors through music",
  },
  {
    id: "3",
    src: "/images/featured-album/3.jpg",
    alt: "OKAMA recording in the studio",
    title: "IN THE STUDIO",
    subtitle: "Creating the Sacred Winds album",
  },
  {
    id: "4",
    src: "/images/featured-album/4.jpg",
    alt: "Traditional drums and ceremonial instruments",
    title: "SACRED INSTRUMENTS",
    subtitle: "Hand-crafted by indigenous artisans",
  },
  {
    id: "5",
    src: "/images/featured-album/5.jpg",
    alt: "OKAMA band members group portrait",
    title: "THE BAND",
    subtitle: "Five voices, one sacred mission",
  },
  {
    id: "6",
    src: "/images/featured-album/6.jpg",
    alt: "Outdoor ceremonial performance",
    title: "SACRED CEREMONY",
    subtitle: "Music under the open sky",
  },
  {
    id: "7",
    src: "/images/featured-album/7.jpg",
    alt: "Sacred fire ceremony with music",
    title: "SACRED FIRE",
    subtitle: "Ancient rituals in modern times",
  },
  {
    id: "8",
    src: "/images/featured-album/1.jpg",
    alt: "OKAMA performing live on stage with traditional instruments",
    title: "LIVE IN CONCERT",
    subtitle: "Sacred music meets modern stage",
  },
  {
    id: "9",
    src: "/images/featured-album/2.jpg",
    alt: "Band members in traditional indigenous regalia",
    title: "SACRED TRADITIONS",
    subtitle: "Honoring our ancestors through music",
  },
  {
    id: "10",
    src: "/images/featured-album/3.jpg",
    alt: "OKAMA recording in the studio",
    title: "IN THE STUDIO",
    subtitle: "Creating the Sacred Winds album",
  },
  {
    id: "11",
    src: "/images/featured-album/4.jpg",
    alt: "Traditional drums and ceremonial instruments",
    title: "SACRED INSTRUMENTS",
    subtitle: "Hand-crafted by indigenous artisans",
  },
  {
    id: "12",
    src: "/images/featured-album/5.jpg",
    alt: "OKAMA band members group portrait",
    title: "THE BAND",
    subtitle: "Five voices, one sacred mission",
  },
  // {
  //   id: "8",
  //   src: "/images/featured-album/9.jpg",
  //   alt: "Community drum circle gathering",
  //   title: "DRUM CIRCLE",
  //   subtitle: "Community gathering through rhythm",
  // },
];

export default function HorizontalImageSlider() {
  return (
    <section className="py-16 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.5}
          centeredSlides={true}
          loop={true}
          navigation={false}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 3.2 },
          }}
        >
          {sliderImages.map((image) => (
            <SwiperSlide key={image.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative group flex-shrink-0"
              >
                <div className="aspect-[4/3] relative overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    draggable={false}
                  />
                  {/* {image.title && (
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">{image.title}</h3>
                      <p className="text-sm">{image.subtitle}</p>
                    </div>
                  )} */}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
