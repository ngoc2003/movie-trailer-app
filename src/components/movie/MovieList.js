import React from "react";
import MovieCard from "./MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher, API } from "../../config";

const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(
    API.getMovieList(type),
    fetcher
  );
  const movies = data?.results || [];

  return (
    <div className="movie-list">
      <Swiper grapcursor="true" spaceBetween={40} slidesPerView={3}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
