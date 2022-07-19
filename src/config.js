export const fetcher = (url) => fetch(url).then((res) => res.json());
const apiKey = "1a763884400befdbd957d043e8e9e19c";
const API_domain = `https://api.themoviedb.org/3`;

// https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
// https://api.themoviedb.org/3/tv/popular?api_key=<<api_key>>&language=en-US&page=1

export const API = {
  getMovieSearch: (query) =>
    `${API_domain}/search/movie?api_key=${apiKey}&query=${query}`,
  getMovieList: (type, page = 1, media_type = "all") => {
    return type === "popular" || type === "top_rated" ||type==="now_playing"
      ? `${API_domain}/${media_type}/${type}?api_key=${apiKey}&page=${page}`
      : type === "discover"
      ? ` ${API_domain}/${type}/${media_type}?api_key=${apiKey}&page=${page}`
      : ` ${API_domain}/${type}/${media_type}/day?api_key=${apiKey}&page=${page}`;
  },

  getMovieDetail: (movieId, media_type='movie') =>
    `${API_domain}/${media_type}/${movieId}?api_key=${apiKey}`,
  getImageUrl: (backdrop_path, size = "original") =>
    `https://image.tmdb.org/t/p/${size}/${backdrop_path}`,
  getDetailMeta: (movieId, meta) =>
    `${API_domain}/movie/${movieId}/${meta}?api_key=${apiKey}`,
  getYoutubeVideo: (path) => `https://www.youtube.com/embed/${path}`,
};
