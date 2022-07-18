import React from "react";
import Banner from "../components/banner/Banner";
import MovieList from "../components/movie/MovieList";
const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <section className="movies-layout page-container pb-20">
        <h2 className="section-title">
          Now Playing
        </h2>
        <MovieList></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="section-title">
          Top Rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="section-title">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </>
  );
};

export default HomePage;
