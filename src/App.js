import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
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
import SignIn from "./sign in/SignIn";
import SignUp from "./sign in/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, setUser } from "./redux/reducers/userReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import Navbar from "./components/Navbar";

const App = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  console.log("app",loggedInUser); 


  React.useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      dispatch(setUser(u?.email));
    });
  }, []);


  return (
    <>
      <Routes>
        <Route path="/" element={<Layout  isLoggedInUser={loggedInUser}/>}>
          <Route index element={<Home />} />
          <Route path="movies/popular" element={<MoviesPopular />} />
          <Route path="movies/upcoming" element={<MoviesUpcoming />} />
          <Route path="movies/now-playing" element={<MoviesNowPlaying />} />
          <Route path="movies/top-rated" element={<MoviesTopRated />} />
          <Route path="tv-shows/popular" element={<PopularTVShows />} />
          <Route path="tv-shows/airing-today" element={<AiringToday />} />
          <Route path="tv-shows/on-tv" element={<OnTV />} />
          <Route path="tv-shows/top-rated" element={<TopRatedTVShows />} />
          <Route path="search-result" element={<SearchResult />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="actors" element={<Actors />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
