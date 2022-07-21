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
  console.log(url)
  return (
    <div className="page-container">
      <div className="md:h-[500px] relative md:mb-10">
        <div className="hidden md:block absolute inset-0 bg-black bg-opacity-90"></div>
        <div
          className="hidden md:block w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${API.getImageUrl(backdrop_path)})`,
          }}
        ></div>

        <div className="flex flex-col md:banner--flex-style ">
          <div className="w-full md:w-auto md:h-[400px] shrink-0 ">
            <img
              src={API.getImageUrl(poster_path)}
              className="w-auto h-full pb-10 object-cover rounded-xl mx-auto"
              alt=""
            />
          </div>
          <div className="md:px-6">
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
            <p className=" text-sm leading-relaxed  mx-auto md:pb-10">
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
