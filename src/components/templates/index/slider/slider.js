"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./slider.module.css"
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";




// import required modules
import { Navigation, Autoplay } from "swiper/modules";

export default function App() {
  const images = [
    "/images/karbala.jpg",
    "/images/qom.jpg",
    "/images/Mashad.jpg",
    "/images/karbala.jpg",
    "/images/qom.jpg",
    "/images/Mashad.jpg",
    "/images/karbala.jpg",
    "/images/qom.jpg",
    "/images/Mashad.jpg",

  ];
  return (
    <div className={styles.slider}>
      <Swiper
        loop={true}
        speed={3000}
        autoplay={{
          delay:0,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        navigation={true}
        spaceBetween={0}
        slidesPerView={3}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
       {images.map((src, index) => (
        <SwiperSlide key={index}>
          <Image width={400} height={200} src={src} alt={`اسلاید ${index + 1}`} className="slider-image" />
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  );
}
