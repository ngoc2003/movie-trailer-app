import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Loading from "../components/Loading";
import MovieCard from "../components/movie/MovieCard";
import { API, fetcher } from "../config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import "swiper/css";
import Searching from "../components/Searching";
const itemsPerPage = 20;
const MoviePage = ({ type, mediaType }) => {
  const [filter, setFilter] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [url, setUrl] = useState(API.getMovieList(type, pageNumber, mediaType));
  const { data, error } = useSWR(url, fetcher);
  const filterDebounce = useDebounce(filter, 500);
  const loading = !data && !error;
  function handleChange(e) {
    setFilter(e.target.value);
  }

  useEffect(() => {
    if (filterDebounce) {
      setUrl(API.getMovieSearch(filterDebounce));
    } else {
      setUrl(API.getMovieList(type, pageNumber, mediaType));
    }
  }, [filterDebounce, pageNumber, type, mediaType]);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {movies.length > 0 &&
              movies.map((item) => (
                <MovieCard
                  key={item.id}
                  item = {item}
                  mediaType={mediaType}
                ></MovieCard>
              ))}
          </div>
        </>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel=""
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </div>
  );
};

export default MoviePage;
