import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import useSWR from "swr";
import { API, fetcher } from "../config";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";
import Loading from "../components/Loading";

function MovieDetailPage() {
  const { movieId } = useParams();
  const { data, error } = useSWR(API.getMovieDetail(movieId), fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <Loading></Loading>;
  const {
    backdrop_path,
    poster_path,
    title,
    genres,
    overview,
    release_date,
    vote_average,
    runtime,
  } = data;
  return (
    <div className="page-container ">
      <div className="h-[500px] relative mb-10">
        <div className="absolute inset-0 bg-black bg-opacity-90"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${API.getImageUrl(backdrop_path)})`,
          }}
        ></div>

        <div className="absolute flex top-0 left-0 h-full w-full px-8 items-center">
          <div className=" h-[400px] shrink-0">
            <img
              src={API.getImageUrl(poster_path)}
              className="w-auto h-full pb-10 object-cover rounded-xl mx-auto"
              alt=""
            />
          </div>
          <div className="px-6">
            <h1 className="text-4xl font-bold text-primary">
              {title}
              <span className="opacity-80 text-3xl px-2">
                ({new Date(release_date).getFullYear()})
              </span>
            </h1>
            <div className="mb-5">
              <span className="text-sm">
                <span className="opacity-80">Average: </span>
                {vote_average}/10
              </span>
              <span className="text-sm pl-4">
                <span className="opacity-80">Run time: </span>
                {runtime}
              </span>
            </div>
            {genres?.length > 0 && (
              <div className="flex items-center flex-wrap mb-5 gap-x-5 gap-y-3 ">
                {genres.map((item) => (
                  <span
                    className="py-1 px-4 border border-white rounded"
                    key={item.id}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            )}
            <h4 className="text-xl font-bold pb-2 text-primary">Overview</h4>
            <p className=" text-sm leading-relaxed  mx-auto pb-10">
              {overview}
            </p>
          </div>
        </div>
      </div>

      <MovieCredit></MovieCredit>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar>
    </div>
  );
}

function MovieCredit() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    API.getDetailMeta(movieId, "credits"),
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const { cast } = data;
  return (
    <div className="py-10">
      <h2 className="section-title-primary">
        Series Cast
      </h2>
      <Swiper grapcursor="true" spaceBetween={40} slidesPerView={5}>
        {cast?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="cast-item">
              <img
                src={API.getImageUrl(item.profile_path)}
                alt=""
                className="w-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl">{item.name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function MovieVideo() {
  const { movieId } = useParams();
  const { data, error } = useSWR(API.getDetailMeta(movieId, "videos"), fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { results } = data;
  return (
    <>
      {results
        ?.filter((item) => {
          return item.type === "Trailer" && item;
        })
        ?.map((item) => (
          <div key={item.id} className="w-full aspect-video py-10">
            <h2 className="section-title-primary">
              {item.name}
            </h2>
            <iframe
              id={item.id}
              className="w-full h-full object-fill"
              src={API.getYoutubeVideo(item.key)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
    </>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    API.getDetailMeta(movieId, "similar"),
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const { results } = data;

  return (
    <div className="py-10">
      <h2 className="section-title-primary">
        Similar Movies
      </h2>
      <div className="movie-list">
        <Swiper grapcursor="true" spaceBetween={40} slidesPerView={3}>
          {results?.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailPage;
