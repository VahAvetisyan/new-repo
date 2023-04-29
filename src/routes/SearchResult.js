import React, { useEffect, useState } from "react";
import "./style/actors.css";
import { useLocation, useNavigate } from "react-router-dom";

const MoviesNowPlaying = () => {
  let [movies, setMovies] = useState([]);
  const navigate = useNavigate()
  const location = useLocation("search-result");
  let moviesArr = location.state.movies;

  useEffect(() => {
    setMovies(moviesArr);
  }, [moviesArr]);

  
  const handlerOnClick = (movie, name) => {
    navigate(`/movie/${name}`,{state:{
      movie: movie,
    }})
  }

  return (
    <div id="actors">
      <h2>Search Results:</h2>
      <div id="actors-imgs-container">
        {movies.map((movie) =>
          movie.poster_path ? (
            <div key={movie.original_title} onClick={()=>{handlerOnClick(movie, movie.original_title)}}>
              <img
                className="actors-img"
                key={movie.original_title}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt="movie"
              />
              <h3>{movie.title}</h3>
            </div>
          ) : (
            <div onClick={()=>{handlerOnClick(movie, movie.original_title)}}>
              <img
                className="actors-img"
                key={movie.original_title}
                src={`https://static.vecteezy.com/system/resources/previews/010/191/968/non_2x/error-404-icon-isolated-contour-symbol-illustration-vector.jpg`}
                alt="404 Image Not Found"
              />
              <h3>{movie.title}</h3>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MoviesNowPlaying;
