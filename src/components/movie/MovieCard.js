import React from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config";
import Button from "../Button";

const MovieCard = ({ item, mediaType= 'movies' }) => {
  mediaType = mediaType === 'movie'? 'movies' : mediaType
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col h-full text-white rounded-lg p-3 bg-slate-800 select-none">
      <img
        className="w-full object-cover rounded-lg mb-5"
        src={API.getImageUrl(poster_path, "w500")}
        alt=""
      />
      <h3 className="text-xl mb-3 text-bold">{title}</h3>
      <div className="flex flex-col flex-1 justify-end">
        <div className="flex mb-5 opacity-50 items-center justify-between text-sm">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/${mediaType}/${id}`)} fluid>
          Watch Now
        </Button>
      </div>
    </div>
  );
};

// MovieCard.
export default MovieCard;
