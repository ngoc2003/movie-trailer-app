import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { API, fetcher } from "../config";
import useSWR from "swr";
import Loading from "../components/Loading";
import { MovieSimilar } from "../components/movie/MovieData/MovieSimilar";
import { MovieCredit } from "../components/movie/MovieData/MovieCredit";
import { MovieVideo } from "../components/movie/MovieData/MovieVideo";

function MovieDetailPage() {
  const { movieId } = useParams();
  const {state} = useLocation();
  const media_type = state.media_type
  const { data, error } = useSWR(API.getMovieDetail(movieId, media_type ), fetcher);

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
    name,
    first_air_date,
    number_of_episodes,
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
              {title || name}
              <span className="opacity-80 text-xl px-2">
                ({new Date(release_date || first_air_date).getFullYear()})
              </span>
            </h1>
            <div className="mb-5">
              <span className="text-sm">
                <span className="opacity-50">Average: </span>
                {vote_average}/10
              </span>
              <span className="text-sm pl-4">
                <span className="opacity-50">
                  {runtime ? "Run time: " : "Episodes: "}
                </span>
                {runtime || number_of_episodes}
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
      <MovieCredit media_type={media_type}></MovieCredit>
      <MovieVideo media_type={media_type}></MovieVideo>
      <MovieSimilar media_type={media_type}></MovieSimilar>
    </div>
  );
}

export default MovieDetailPage;
