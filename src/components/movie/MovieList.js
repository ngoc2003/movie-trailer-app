import React from "react";
import MovieCard from "./MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher, API } from "../../config";

const MovieList = ({ type = "now_playing", mediaType = "movie" }) => {
  const { data, error } = useSWR(API.getMovieList(type, 1, "movie"), fetcher);
  const movies = data?.results || [];

  return (
    <div className="movie-list">
      <Swiper
        grapcursor="true"
        spaceBetween={40}
        slidesPerView={1}
        breakpoints={{
          620: {
            slidesPerView: 2,
          },
          950: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          }
        }}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}  mediaType={mediaType}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
