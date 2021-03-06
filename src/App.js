import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import CommingSoon from "./components/CommingSoon";
import Loading from "./components/Loading";
import "swiper/scss";
import ScrollToTop from "./components/ScrollToTop";

const HomePage = lazy(() => import("./pages/HomePage"));
const Main = lazy(() => import("./components/layout/Main"));
const Movies = lazy(() => import("./pages/categorize/Movies"));
const TvSeries = lazy(() => import("./pages/categorize/TvSeries"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
function App() {
  return (
    <Suspense fallback={<></>}>
      <ScrollToTop>
        <Loading>
          <Routes>
            <Route element={<Main></Main>}>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route exact path="/movie" element={<Movies></Movies>}></Route>
              <Route path="/discover" element={<Movies></Movies>}></Route>
              <Route path="/trending" element={<Movies></Movies>}></Route>
              <Route path="/top_rated" element={<Movies></Movies>}></Route>
              <Route path="/tv" element={<TvSeries></TvSeries>}></Route>
              <Route
                path="/tv/:movieId"
                element={<MovieDetailPage></MovieDetailPage>}
              ></Route>
              <Route
                path="/movie/:movieId"
                element={<MovieDetailPage></MovieDetailPage>}
              ></Route>
              <Route
                path="/community"
                element={<CommingSoon></CommingSoon>}
              ></Route>
              <Route
                path="/recent"
                element={<CommingSoon></CommingSoon>}
              ></Route>
              {/* <Route
              path="/setting"
              element={<CommingSoon></CommingSoon>}
            ></Route>
            <Route path="/log" element={<CommingSoon></CommingSoon>}></Route> */}
            </Route>
          </Routes>
        </Loading>
      </ScrollToTop>
    </Suspense>
  );
}

export default App;
