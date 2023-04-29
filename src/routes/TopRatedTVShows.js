import React, { useEffect, useState } from "react";
import "./style/actors.css";
import { useNavigate } from "react-router-dom";

const OnTV = () => {
  let [movies, setActors] = useState([]);
  let [page, setPage] = useState(1);
  const navigate = useNavigate()
  const api_key = "8cc8bb5915e1ce414955be2f44bcb790";

  const logJSONData = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=${page}`
    );
    let jsonData = await response.json();
    setActors(jsonData.results);
  };

  useEffect(() => {
    logJSONData();
  }, [page]);

  const handlerOnClick = (movie, name) => {
    navigate(`/tv-show/${name}`,{state:{
      movie: movie,
    }})
  }


  return (
    <div id="actors">
      <h2>Top Rated TV Shows</h2>
      <div id="actors-imgs-container">
        {movies.map((movie) => (
          <div key={movie.name} onClick={()=>{handlerOnClick(movie, movie.name)}}>
            <img
              className="actors-img"
              key={movie.name}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt="actor"
            />
            <h3>{movie.name}</h3>
          </div>
        ))}
      </div>
      <div id="buttons-div">
        <button
          onClick={() => {
            if (page > 1) setPage(--page);
          }}
        >
          ⮜
        </button>
        <b>PAGE {page}</b>
        <button
          onClick={() => {
            setPage(++page);
          }}
        >
          ⮞
        </button>
      </div>
    </div>
  );
};

export default OnTV;
