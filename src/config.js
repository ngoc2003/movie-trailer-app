export const fetcher = (url) => fetch(url).then((res) => res.json());
export const REACT_APP_URL = "https://tl-movie.vercel.app";
export const REACT_APP_FACEBOOK_APP_ID = '3108322012762887'
const apiKey = "1a763884400befdbd957d043e8e9e19c";
const API_domain = `https://api.themoviedb.org/3`;

export const API = {
  getMovieSearch: (query) =>
    `${API_domain}/search/movie?api_key=${apiKey}&query=${query}`,
  getMovieList: (type, page = 1, media_type = "all") => {
    return type === "popular" || type === "top_rated" || type === "now_playing"
      ? `${API_domain}/${media_type}/${type}?api_key=${apiKey}&page=${page}`
      : type === "discover"
      ? ` ${API_domain}/${type}/${media_type}?api_key=${apiKey}&page=${page}`
      : ` ${API_domain}/${type}/${media_type}/day?api_key=${apiKey}&page=${page}`;
  },

  getMovieDetail: (movieId, media_type = "movie") =>
    `${API_domain}/${media_type}/${movieId}?api_key=${apiKey}`,
  getImageUrl: (backdrop_path, size = "original") =>
    `https://image.tmdb.org/t/p/${size}/${backdrop_path}`,
  getDetailMeta: (movieId, meta, media_type = "movie") =>
    `${API_domain}/${media_type}/${movieId}/${meta}?api_key=${apiKey}`,
  getYoutubeVideo: (path) => `https://www.youtube.com/embed/${path}`,
};
