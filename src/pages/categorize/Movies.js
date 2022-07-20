import React from "react";
import MoviePage from "../MoviePage";

const Movies = () => {
  const pathname = window.location.pathname.slice(1);
  const type = pathname === "movie" ? "popular" : pathname;

  return (
    <div>
      <MoviePage type={type} mediaType={"movie"}></MoviePage>
    </div>
  );
};

export default Movies;
