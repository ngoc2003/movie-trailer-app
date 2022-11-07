import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { API, fetcher, REACT_APP_URL } from "../config";
import useSWR from "swr";
import Loading from "../components/Loading";
import { MovieSimilar } from "../components/movie/MovieData/MovieSimilar";
import { MovieCredit } from "../components/movie/MovieData/MovieCredit";
import { MovieVideo } from "../components/movie/MovieData/MovieVideo";
import CommentsFb from "../components/Facebook";

function MovieDetailPage() {
  const { movieId } = useParams();
  const { state } = useLocation();
  const media_type = state?.media_type;
  const { data, error } = useSWR(
    API.getMovieDetail(movieId, media_type),
    fetcher
  );

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
  const url = `${REACT_APP_URL}/${media_type}/${movieId}`;
  return (
    <div className="page-container">
      <div className="md:h-[500px] relative md:mb-10">
        <div className="absolute inset-0 hidden bg-black md:block bg-opacity-90"></div>
        <div
          className="hidden w-full h-full bg-no-repeat bg-cover md:block"
          style={{
            backgroundImage: `url(${API.getImageUrl(backdrop_path)})`,
          }}
        ></div>

        <div className="flex flex-col md:banner--flex-style ">
          <div className="w-full md:w-auto md:h-[400px] shrink-0 ">
            <img
              src={API.getImageUrl(poster_path)}
              className="object-cover w-auto h-full pb-10 mx-auto rounded-xl"
              alt=""
            />
          </div>
          <div className="md:px-6">
            <h1 className="text-4xl font-bold text-primary">
              {title || name}
              <span className="px-2 text-xl opacity-80">
                ({new Date(release_date || first_air_date).getFullYear()})
              </span>
            </h1>
            <div className="mb-5">
              <span className="text-sm">
                <span className="opacity-50">Average: </span>
                {vote_average}/10
              </span>
              <span className="pl-4 text-sm">
                <span className="opacity-50">
                  {runtime ? "Run time: " : "Episodes: "}
                </span>
                {runtime || number_of_episodes}
              </span>
            </div>
            {genres?.length > 0 && (
              <div className="flex flex-wrap items-center mb-5 gap-x-5 gap-y-3 ">
                {genres.map((item) => (
                  <span
                    className="px-4 py-1 border border-white rounded"
                    key={item.id}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            )}
            <h4 className="pb-2 text-xl font-bold text-primary">Overview</h4>
            <p className="mx-auto text-sm leading-relaxed md:pb-10">
              {overview}
            </p>
          </div>
        </div>
      </div>
      <MovieCredit media_type={media_type}></MovieCredit>
      <MovieVideo media_type={media_type}></MovieVideo>
      <MovieSimilar media_type={media_type}></MovieSimilar>
      <CommentsFb url={url}></CommentsFb>
      
    </div>
  );
}

export default MovieDetailPage;
