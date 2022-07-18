export const fetcher =  (url) => fetch(url).then((res) => res.json());
const apiKey = '1a763884400befdbd957d043e8e9e19c'
const API_domain = `https://api.themoviedb.org/3/movie`
    // `https://api.themoviedb.org/3/movie/${movieId}?api_key=1a763884400befdbd957d043e8e9e19c`,
//
export const API = {
    getMovieList: (type) => `${API_domain}/${type}?api_key=${apiKey}`,
    getMovieDetail: (movieId) => `${API_domain}/${movieId}?api_key=${apiKey}`,
    getImageUrl: (backdrop_path, size='original') => `https://image.tmdb.org/t/p/${size}/${backdrop_path}`,
    getDetailMeta: (movieId, meta) => `${API_domain}/${movieId}/${meta}?api_key=${apiKey}`,
    getYoutubeVideo: (path) => `https://www.youtube.com/embed/${path}`
}

