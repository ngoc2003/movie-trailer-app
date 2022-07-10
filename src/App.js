// import './App.css';
import { NavLink } from "react-router-dom";
import Banner from "./components/banner/Banner";
import Header from "./components/layout/Header";
import MovieList from "./components/movie/MovieList";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
// https://api.themoviedb.org/3/search/movie?api_key=1a763884400befdbd957d043e8e9e19c&query=''
// https://api.themoviedb.org/3/movie/now_playing?1a763884400befdbd957d043e8e9e19c&language=en-US&page=1
function App() {
  return (
    <>
      <Routes>
        <Route element={<Main></Main>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailPage></MovieDetailPage>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
