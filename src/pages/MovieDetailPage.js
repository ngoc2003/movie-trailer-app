import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import useSWR from "swr";
// import { fetcher } from "../config";
import axios from "axios";
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=1a763884400befdbd957d043e8e9e19c
const getData = async (movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=1a763884400befdbd957d043e8e9e19c`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
function MovieDetailPage() {
  const { movieId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    getData(movieId).then((data) => setData(data));
  }, [movieId]);
  console.log(data);
  //   const { data } = useSWR(
  //     `https://api.themoviedb.org/3/movie/${movieId}?api_key=1a763884400befdbd957d043e8e9e19c`,
  //     fetcher
  //   );
  console.log(data);
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="page-container">
      <div className="h-[500px] relative ">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>

      <div className="page-container h-[400px] -mt-[300px] relative">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          className="w-auto h-full pb-10 object-cover rounded-xl mx-auto"
          alt=""
        />
      </div>
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        {title}
      </h1>
      {genres?.length > 0 && (
        <div className="flex items-center justify-center mb-10 gap-x-5 ">
          {genres.map((item) => (
            <span
              className="py-1 px-4 border border-primary text-primary rounded"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-sm leading-relaxed w-[80%] mx-auto pb-10">{overview}</p>
    </div>
  );
}

export default MovieDetailPage;
