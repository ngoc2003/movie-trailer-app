import React from "react";
import { API, fetcher } from "../../config";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import BannerItem from "./BannerItem";

const Banner = () => {
  SwiperCore.use([Autoplay]);
  const { data, error } = useSWR(
    API.getMovieList("popular", 1, "movie"),
    fetcher
  );
  const movies = data?.results || [];
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper
        grabCursor="true"
        slidesPerView={1}
        autoplay={{
          delay: 3500,
        }}
      >
        {movies.length > 0 &&
          movies.slice(0, 10).map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
        <div
          class="swiper-pagination"
          style={{ backgroundColor: "#fff" }}
        ></div>
      </Swiper>
    </section>
  );
};

export default Banner;
