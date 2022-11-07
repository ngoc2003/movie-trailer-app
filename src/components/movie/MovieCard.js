import React from "react";
import { Link } from "react-router-dom";
import { API, fetcher } from "../../config";
import Button from "../Button";
import { BsFillStarFill } from "react-icons/bs";
import useSWR from "swr";

const MovieCard = ({ id, mediaType = "movie" }) => {
  const stateTransfer = {
    media_type: mediaType,
  };
  
  const { data, error } = useSWR(API.getMoviebyID(id), fetcher);
  const title =data?.title
  const vote_average =data?.vote_average
  const release_date =data?.release_date
  const poster_path =data?.poster_path
  const name =data?.name
  const first_air_date =data?.first_air_date
  // const {
  //   title,
  //   vote_average,
  //   release_date,
  //   poster_path,
  //   name,
  //   first_air_date,
  // } = data;
  return data && (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <div className="relative">
        <span className="absolute flex items-center justify-center w-8 h-8 leading-none duration-200 rounded-full cursor-pointer hover:gap-3 top-3 right-3 bg-white/30 backdrop-blur-sm group hover:bg-primary hover:w-auto hover:px-3">
          +
          <span className="w-0 text-transparent group-hover:w-auto group-hover:text-white">
            Add to favorite
          </span>
        </span>
        <img
          className="w-full object-cover rounded-lg mb-5 max-h-[600px]"
          src={API.getImageUrl(poster_path, "w500")}
          alt=""
        />
      </div>
      <h3 className="mb-3 text-xl text-bold">{title || name}</h3>
      <div className="flex flex-col justify-end flex-1">
        <div className="flex items-center justify-between mb-5 text-sm opacity-50">
          <span>{new Date(release_date || first_air_date).getFullYear()}</span>
          <span className="flex items-center gap-1">
            {vote_average && vote_average.toFixed(1)}
            <BsFillStarFill></BsFillStarFill>
          </span>
        </div>
        <Link to={`/${mediaType}/${id}`} state={stateTransfer}>
          <Button fluid>Watch Now</Button>
        </Link>
      </div>
    </div>
  );
  return <></>
};

export default MovieCard;
