import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import useSWR from "swr";
import { fetcher } from "../config";
import axios from "axios";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

const getData = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=1a763884400befdbd957d043e8e9e19c`
  );
  return response.data;
};
const getCreditData = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=1a763884400befdbd957d043e8e9e19c`
  );
  return response.data;
};
const getVideo = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=1a763884400befdbd957d043e8e9e19c`
  );
  return response.data;
};

const getSimilar = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=1a763884400befdbd957d043e8e9e19c`
  );
  return response.data;
};

function MovieDetailPage() {
  const { movieId } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    getData(movieId).then((data) => setData(data));
  }, [movieId]);
  console.log(data);
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
    <div className="page-container">
      <div className="h-[500px] relative ">
        <div className="absolute inset-0 bg-black bg-opacity-90"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>

        <div className="absolute flex top-0 left-0 h-full w-full px-8 items-center">
          <div className=" h-[400px] shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/original/${poster_path}`}
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
                {runtime}/10
              </span>
            </div>
            {genres?.length > 0 && (
              <div className="flex items-center  mb-5 gap-x-5 ">
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
  const [data, setData] = useState([]);
  useEffect(() => {
    getCreditData(movieId).then((data) => setData(data));
  }, [movieId]);
  const { cast } = data;
  return (
    <>
      <h2 className="text-center text-3xl pb-10">Series Cast</h2>
      <Swiper grapcursor="true" spaceBetween={40} slidesPerView={5}>
        {cast?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="cast-item">
              <img
                src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                alt=""
                className="w-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl">{item.name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

function MovieVideo() {
  const { movieId } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    getVideo(movieId).then((data) => setData(data));
  }, [movieId]);

  const { results } = data;
  return (
    <div className="py-10 w-full aspect-video">
      {results?.slice(-1)?.map((item) => (
        <iframe
          id={item.id}
          className="w-full h-full object-fill"
          src={`https://www.youtube.com/embed/${item.key}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ))}
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    getSimilar(movieId).then((data) => setData(data));
  }, [movieId]);
  const { results } = data;

  return (
    <div className="py-10">
      <h2 className="text-3xl mb-10">Similar movies</h2>
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
