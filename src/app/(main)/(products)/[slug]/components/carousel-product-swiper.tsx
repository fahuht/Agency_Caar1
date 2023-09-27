"use client";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../index.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import React, { useState } from "react";
import { Swiper as SwiperTypes } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";
// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import NoImage from "../images/no-image.png";



type Props = {
  listImages: string[];
};

export default function CarouselProductSwiper({ listImages }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null);
  const [openFSrc, setOpenFScr] = useState<boolean>(false);

  const listNoImage = [NoImage.src, NoImage.src];
  const listImage = listImages &&
    listImages.length > 0 &&
    listImages.map(item => {
      return {
        src: item
      }
    }) || []

  const handleThumbsSwiper = (swiper: SwiperTypes): void => {
    if (swiper !== null) {
      setThumbsSwiper(swiper);
    }
  };
  return (
    <>

      <Lightbox
        slides={listImage}
        open={openFSrc}
        // index={index}
        close={() => setOpenFScr(false)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
      <Swiper
        loop
        spaceBetween={10}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper-carousel-container"
      >
        <button
          type="button"
          onClick={() => setOpenFScr(true)}
          className="btn-fullscreen"
        >
          <i className="fa-solid fa-expand text-white text-xl md:text-3xl lg:text-4xl"></i>
        </button>
        {(listImages &&
          listImages.length > 0 &&
          listImages.map((item) => (
            <SwiperSlide key={item}>
              <img src={item} />
            </SwiperSlide>
          ))) ||
          listNoImage.map((item) => (
            <SwiperSlide key={item}>
              <img src={item} />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={handleThumbsSwiper}
        loop
        spaceBetween={10}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="swiper-thumbnail-container mt-3"
      >
        {listImages &&
          listImages.length > 0 &&
          listImages.map((item) => (
            <SwiperSlide key={item}>
              <img src={item} />
            </SwiperSlide>
          )) ||
          listNoImage.map((item) => (
            <SwiperSlide key={item}>
              <img src={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
