import { Routes, Route } from "react-router-dom";
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
import SignIn from "./components/sign in/SignIn";
import SignUp from "./components/sign in/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, setUser } from "./redux/reducers/userReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import ProfilePage from "./routes/ProfilePage";
import Watchlist from "./routes/Watchlist";
import Terms from "./components/sign in/Terms";
import SimpleSnackbar from "./components/SnackBar";

const App = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();


  React.useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      dispatch(setUser(u?.email));
    });
  }, []);
localStorage.setItem('hello','world')
 console.log(localStorage.getItem('hello'))
  return (
    <>
    <SimpleSnackbar />
      <Routes>
          <Route path="/" element={<Layout isLoggedInUser={loggedInUser} />}>
            <Route index element={<Home />} />
            <Route path="movies/popular" element={<MoviesPopular />} />
            <Route path="movies/upcoming" element={<MoviesUpcoming />} />
            <Route path="movies/now-playing" element={<MoviesNowPlaying />} />
            <Route path="movies/top-rated" element={<MoviesTopRated />} />
            <Route path="terms" element={<Terms />} />
            <Route path="tv-shows/popular" element={<PopularTVShows />} />
            <Route path="movie/:movieId" element={<MoviePage />} />
            <Route path="tv-show/:tvId" element={<TvShowPage />} />
            <Route path="people/*" element={<ActorsBio />} />
            <Route path="tv-shows/airing-today" element={<AiringToday />} />
            <Route path="tv-shows/on-tv" element={<OnTV />} />
            <Route path="tv-shows/top-rated" element={<TopRatedTVShows />} />
            <Route path="search-result" element={<SearchResult />} />
            <Route path="actors" element={<Actors />} />
          {loggedInUser ? (
            <>
            <Route path="user-profile" element={<ProfilePage />} />
            <Route path="user-watchlist" element={<Watchlist />} />
            </>
        ) : (
            <>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            </>
        )}
            <Route path="*" element={<Home />} />
          </Route>
      </Routes>
    </>
  );
};

export default App;
