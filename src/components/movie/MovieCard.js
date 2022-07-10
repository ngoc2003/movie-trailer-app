import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col h-full text-white rounded-lg p-3 bg-slate-800 select-none">
      <img
        className="w-full object-cover rounded-lg mb-5"
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
      />
      <h3 className="text-xl mb-3 text-bold">{title}</h3>
      <div className="flex flex-col flex-1 justify-end">
        <div className="flex mb-5 opacity-50 items-center justify-between text-sm">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <button
          onClick={() => navigate(`/movies/${id}`)}
          className="py-3 px-6 rounded-lg capitalize bg-primary w-full"
        >
          Watch now
        </button>
      </div>
    </div>
  );
};

// MovieCard.
export default MovieCard;
