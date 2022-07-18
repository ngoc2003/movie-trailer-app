import React, { useEffect, useRef, useState } from "react";
// import MovieList from "../components/movie/MovieList";
import useSWR from "swr";
import Loading from "../components/Loading";
import MovieCard from "../components/movie/MovieCard";
import { fetcher } from "../config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Searching from "../components/Searching";

const itemsPerPage = 20;
const MoviePage = () => {
  const [filter, setFilter] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=1a763884400befdbd957d043e8e9e19c&page=${pageNumber}`
  );
  const { data, error } = useSWR(url, fetcher);
  const filterDebounce = useDebounce(filter, 500);
  const loading = !data && !error;
  function handleChange(e) {
    setFilter(e.target.value);
  }

  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=1a763884400befdbd957d043e8e9e19c&query=${filterDebounce}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=1a763884400befdbd957d043e8e9e19c&page=${pageNumber}`
      );
    }
  }, [filterDebounce, pageNumber]);

  // Pagination
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    if (!data || !data.total_pages) return;
    setPageCount(Math.ceil(data.total_pages / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_pages;
    setItemOffset(newOffset);
    setPageNumber(event.selected + 1);
  };
  const movies = data?.results || [];

  return (
    <div className=" page-container">
      <Searching handleChange={handleChange}></Searching>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-10">
            {movies.length > 0 &&
              movies.map((item) => (
                <MovieCard key={item.id} item={item}></MovieCard>
              ))}
          </div>
        </>
      )}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
    </div>
  );
};

export default MoviePage;
