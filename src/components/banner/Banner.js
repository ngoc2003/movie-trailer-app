import React from "react";
import { API, fetcher } from "../../config";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import BannerItem from "./BannerItem";

const Banner = () => {
  const { data, error } = useSWR(
    API.getMovieList("popular", 1, "movie"),
    fetcher
  );
  const movies = data?.results || [];
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor="true" slidesPerView={1}>
        {movies.length > 0 &&
          movies.slice(0, 10).map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Banner;
