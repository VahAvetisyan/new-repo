import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "./routes/Home";
import MoviesPopular from "./routes/MoviesPopular";
import MoviesNowPlaying from "./routes/MoviesNowPlaying";
import OnTV from "./routes/OnTV";
import MoviesUpcoming from "./routes/MoviesUpcoming";
import Layout from "./components/Layout";
import PopularTVShows from "./routes/PopularTVShows";
import TopRatedTVShows from "./routes/TopRatedTVShows";
import AiringToday from "./routes/AiringToday";
import Actors from "./routes/Actors";
import MoviesTopRated from "./routes/MoviesTopRated";
import SearchResult from "./routes/SearchResult";
import MoviePage from "./routes/MoviePage";
import TvShowPage from "./routes/TvShowPage";
import ActorsBio from "./routes/ActorsBio";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, setUser } from "./redux/reducers/userReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import ProfilePage from "./routes/ProfilePage";
import Watchlist from "./routes/Watchlist";
import SimpleSnackbar from "./components/SnackBar";
import Registration from "./components/sing in/SingIn";
import Settings from "./routes/Settings";

const App = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      dispatch(setUser(u?.email));
    });
  }, []);

  return (
    <>
      <SimpleSnackbar />

      <Routes>
        <Route path="/" element={<Layout isLoggedInUser={loggedInUser} />}>
          <Route index element={<Home />} />
          <Route path="movies/">
            <Route path="popular" element={<MoviesPopular />} />
            <Route path="upcoming" element={<MoviesUpcoming />} />
            <Route path="now-playing" element={<MoviesNowPlaying />} />
            <Route path="top-rated" element={<MoviesTopRated />} />
          </Route>
          <Route path="movie/:movieId" element={<MoviePage />} />
          <Route path="tv-shows/">
            <Route path="popular" element={<PopularTVShows />} />
            <Route path="airing-today" element={<AiringToday />} />
            <Route path="on-tv" element={<OnTV />} />
            <Route path="top-rated" element={<TopRatedTVShows />} />
          </Route>
          <Route path="tv-show/:tvId" element={<TvShowPage />} />
          <Route path="people/:actorId" element={<ActorsBio />} />
          <Route path="search-result" element={<SearchResult />} />
          <Route path="actors" element={<Actors />} />
          {loggedInUser ? (
            <>
              <Route path="user-profile" element={<ProfilePage />} />
              <Route path="user-watchlist" element={<Watchlist />} />
              <Route path="user-settings" element={<Settings />} />
            </>
          ) : (
            <>
              <Route path="registation" element={<Registration />} />
            </>
          )}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
