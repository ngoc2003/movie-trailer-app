import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API, fetcher } from "../../config";
import Button from "../Button";
import { BsFillStarFill } from "react-icons/bs";
import useSWR from "swr";
import { useFavorite } from "../../hooks/useFavorite";
import {Add} from "../../utils/updateFavorite";
import Heart from "../../utils/removeFavorite";

const MovieCard = ({ movieid, item = "", mediaType }) => {
  const stateTransfer = {
    mediaType: mediaType,
  };
  const { data, error } = useSWR(API.getMoviebyID(movieid, mediaType), fetcher);
  const result = movieid ? data : item;
  const title = result?.title;
  const vote_average = result?.vote_average;
  const release_date = result?.release_date;
  const poster_path = result?.poster_path;
  const name = result?.name;
  const first_air_date = result?.first_air_date;
  const id = result?.id;
  const isFavorite = useFavorite(id);
  return (
    result && (
      <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
        <div className="relative">
          {isFavorite ? (
            <div className="absolute flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-primary top-3 right-3">
              <Heart id={id} mediaType={mediaType}></Heart>
            </div>
          ) : (
            <Add id={id} mediaType={mediaType}></Add>
          )}
          <img
            className="w-full object-cover rounded-lg mb-5 max-h-[600px]"
            src={API.getImageUrl(poster_path, "w500")}
            alt=""
          />
        </div>
        <h3 className="mb-3 text-xl text-bold">{title || name}</h3>
        <div className="flex flex-col justify-end flex-1">
          <div className="flex items-center justify-between mb-5 text-sm opacity-50">
            <span>
              {new Date(release_date || first_air_date).getFullYear()}
            </span>
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
    )
  );
};

export default MovieCard;
