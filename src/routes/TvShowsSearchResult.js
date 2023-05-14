import React, { useEffect, useState } from "react";
import "./style/actors.css";
import { useLocation, useNavigate } from "react-router-dom";
import "./style/responsive.css";


const TvShowsSearchResult = () => {
  let [movies, setMovies] = useState([]);
  const navigate = useNavigate()
  const location = useLocation("search-result");
  let moviesArr = location.state.tvShows;



  useEffect(() => {
    setMovies(moviesArr);
  }, [moviesArr]);

  const handlerOnClick = (movie, id) => {
    navigate(`/tv-show/${id}`,{state:{
      movie: movie,
    }})
  }


  return (
    <div id="actors">
      <h2>Finded TV Shows:</h2>
      <div id="actors-imgs-container">
        {movies.map((movie) =>
          movie.poster_path ? (
            <div key={movie.original_title}  onClick={()=>{handlerOnClick(movie, movie.id)}}>
              <img
                className="actors-img"
                key={movie.original_title}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt="movie"
              />
              <h3>{movie.title}</h3>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TvShowsSearchResult;
