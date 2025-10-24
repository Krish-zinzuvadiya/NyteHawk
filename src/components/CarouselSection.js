// src/components/CarouselSection.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/CarouselSection.css';
import '../styles/MainHome.css';

const slides = [
  {
    title: 'Find Nearby ATMs',
    image: 'https://cdn-icons-png.flaticon.com/512/483/483947.png',
  },
  {
    title: 'Medical Help At Night',
    image: 'https://cdn-icons-png.flaticon.com/512/1042/1042391.png',
  },
  {
    title: 'Late Night Fuel Stations',
    image: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
  },
  {
    title: 'Restaurants Open Late',
    image: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
  },
];

const CarouselSection = () => {
  return (
    <div className="carousel-container">
      <h2 className="carousel-heading">Explore Night Services</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="slide-card">
              <img src={slide.image} alt={slide.title} />
              <h4>{slide.title}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselSection;
