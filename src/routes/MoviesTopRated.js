import React, { useEffect, useState } from "react";
import "./style/actors.css"

const MoviesTopRated = () => {
  let [movies, setActors] = useState([])
  let [page,setPage] = useState(1)
  const api_key = "8cc8bb5915e1ce414955be2f44bcb790"

 const logJSONData = async()=> {
    let response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=${page}`);
    let jsonData = await response.json();
    setActors(jsonData.results)
  }

  useEffect(() => {
    logJSONData();
  },[page]);

  return (
    <div id="actors">
      <h2>Top Rated Movies</h2>
      <div id="actors-imgs-container">
        {movies.map((movie) => (
          <div key={movie.original_title}>
            <img className="actors-img" key={movie.original_title} src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt="actor"/>
            <h3>{movie.original_title}</h3>
          </div>
        ))}
      </div>
      <div id="buttons-div">
        <button onClick={()=>{if(page>1) setPage(--page)}}>⮜</button>
        <b>PAGE {page}</b>
        <button onClick={()=>{setPage(++page)}}>⮞</button>
      </div>
    </div>
  );
};

export default MoviesTopRated;
