import React from "react";
import { API, fetcher } from "../../config";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import BannerItem from "./BannerItem";

const Banner = () => {
  SwiperCore.use([Autoplay]);
  const { data } = useSWR(API.getMovieList("popular", 1, "movie"), fetcher);
  const movies = data?.results || [];
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper
        grabCursor="true"
        slidesPerView={1}
        autoplay={{
          delay: 8000,
        }}
      >
        {movies.length > 0 &&
          movies.slice(0, 10).map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item} mediaType="movie"></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Banner;
