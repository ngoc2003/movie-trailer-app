import React from "react";
import { Link } from "react-router-dom";
import { API } from "../../config";
import Button from "../Button";
import {BsFillStarFill} from 'react-icons/bs'

const MovieCard = ({ item, mediaType = "movie" }) => {
  const stateTransfer = {
    media_type: mediaType,
  };
  const {
    title,
    vote_average,
    release_date,
    poster_path,
    id,
    name,
    first_air_date,
  } = item;
  return (
    <div className="movie-card flex flex-col h-full text-white rounded-lg p-3 bg-slate-800 select-none">
      <img
        className="w-full object-cover rounded-lg mb-5 max-h-[600px]"
        src={API.getImageUrl(poster_path, "w500")}
        alt=""
      />
      <h3 className="text-xl mb-3 text-bold">{title || name}</h3>
      <div className="flex flex-col flex-1 justify-end">
        <div className="flex mb-5 opacity-50 items-center justify-between text-sm">
          <span>{new Date(release_date || first_air_date).getFullYear()}</span>
          <span className="flex items-center gap-1">{vote_average.toFixed(1)}<BsFillStarFill></BsFillStarFill></span>
        </div>
        <Link to={`/${mediaType}/${id}`} state={stateTransfer}>
          <Button fluid>Watch Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
