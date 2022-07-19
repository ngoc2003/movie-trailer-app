import React from "react";
import MoviePage from "../MoviePage";

const TvSeries = () => {
  const pathname = window.location.pathname.slice(1);
  const type = pathname === "tv" ? "popular" : pathname;

  return (
    <div>
      <MoviePage type={type} mediaType={"tv"}></MoviePage>
    </div>
  );
};

export default TvSeries;
