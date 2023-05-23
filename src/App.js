import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "./routes/Home";
import Layout from "./components/Layout";
import Actors from "./routes/Actors";
import SearchResult from "./routes/SearchResult";
import MoviePage from "./routes/MoviePage";
import TvShowPage from "./routes/TvShowPage";
import ActorsBio from "./routes/ActorsBio";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, setUser } from "./redux/reducers/userReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import ProfilePage from "./routes/ProfilePage";
import SimpleSnackbar from "./components/SnackBar";
import Registration from "./components/sing in/SingIn";
import SharedMovies from "./Shared/SharedMovies";
import SharedTvShows from "./Shared/SharedTvShows";
import Footer from "./components/Footer/Footer";

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
            <Route path="popular" element={<SharedMovies type="popular" />} />
            <Route path="upcoming" element={<SharedMovies type="upcoming" />} />
            <Route
              path="now-playing"
              element={<SharedMovies type="now_playing" />}
            />
            <Route
              path="top-rated"
              element={<SharedMovies type="top_rated" />}
            />
          </Route>
          <Route path="movie/:movieId" element={<MoviePage />} />
          <Route path="tv-shows/">
            <Route path="popular" element={<SharedTvShows type="popular" />} />
            <Route
              path="airing-today"
              element={<SharedTvShows type="airing_today" />}
            />
            <Route path="on-tv" element={<SharedTvShows type="on_the_air" />} />
            <Route
              path="top-rated"
              element={<SharedTvShows type="top_rated" />}
            />
          </Route>
          <Route path="tv-show/:tvId" element={<TvShowPage />} />
          <Route path="people/:actorId" element={<ActorsBio />} />
          <Route path="search-result" element={<SearchResult />} />
          <Route path="actors" element={<Actors />} />
          {loggedInUser ? (
            <>
              <Route path="user-profile" element={<ProfilePage />} />
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
