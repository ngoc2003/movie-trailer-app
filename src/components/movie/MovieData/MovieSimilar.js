import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { API, fetcher } from "../../../config";
import MovieCard from "../MovieCard";

export function MovieSimilar({ mediaType }) {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    API.getDetailMeta(movieId, "similar", mediaType),
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const { results } = data;

  return (
    <div className="py-10">
      <h2 className="section-title-primary">Similar Movies</h2>
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
            },
          }}
        >
          {results?.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item} mediaType={mediaType}></MovieCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
