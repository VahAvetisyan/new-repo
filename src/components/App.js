import { Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import MoviesPopular from "../routes/MoviesPopular";
import MoviesNowPlaying from "../routes/MoviesNowPlaying";
import OnTV from "../routes/OnTV";
import MoviesUpcoming from "../routes/MoviesUpcoming";
import Layout from "./Layout";
import PopularTVShows from "../routes/PopularTVShows";
import TopRatedTVShows from "../routes/TopRatedTVShows";
import AiringToday from "../routes/AiringToday";
import Actors from "../routes/Actors";
import MoviesTopRated from "../routes/MoviesTopRated";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies/popular" element={<MoviesPopular />} />
          <Route path="movies/upcoming" element={<MoviesUpcoming />} />
          <Route path="movies/now-playing" element={<MoviesNowPlaying />} />
          <Route path="movies/top-rated" element={<MoviesTopRated />} />
          <Route path="tv-shows/popular" element={<PopularTVShows />} />
          <Route path="tv-shows/airing-today" element={<AiringToday />} />
          <Route path="tv-shows/on-tv" element={<OnTV />} />
          <Route path="tv-shows/top-rated" element={<TopRatedTVShows />} />
          <Route path="actors" element={<Actors />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
