import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import CommingSoon from "./components/CommingSoon";
import Loading from "./components/Loading";
import Movies from "./pages/categorize/Movies";
import TvSeries from "./pages/categorize/TvSeries";
const HomePage = lazy(() => import("./pages/HomePage"));
const Main = lazy(() => import("./components/layout/Main"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
function App() {
  // let history = useHistory();

  return (
    <Suspense fallback={<></>}>
      <Loading>
        <Routes>
          <Route element={<Main></Main>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route exact path="/movies" element={<Movies></Movies>}></Route>
            <Route path="/discover" element={<Movies></Movies>}></Route>
            <Route path="/trending" element={<Movies></Movies>}></Route>
            <Route path="/top_rated" element={<Movies></Movies>}></Route>
            <Route path="/tv" element={<TvSeries></TvSeries>}></Route>
            <Route
              path="/tv/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
            <Route
              path="/movies/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
            <Route
              path="/community"
              element={<CommingSoon></CommingSoon>}
            ></Route>
            <Route path="/recent" element={<CommingSoon></CommingSoon>}></Route>
            <Route
              path="/setting"
              element={<CommingSoon></CommingSoon>}
            ></Route>
            <Route path="/log" element={<CommingSoon></CommingSoon>}></Route>
          </Route>
        </Routes>
      </Loading>
    </Suspense>
  );
}

export default App;
