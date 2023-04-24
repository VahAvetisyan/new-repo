import React, { useEffect, useState } from "react";
import "./style/home.css";

const Home = () => {
  let [movie, setMovie] = useState({});

  const logJSONData = async () => {
    let api_key = "8cc8bb5915e1ce414955be2f44bcb790";
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
    );
    let jsonData = await response.json();
    setMovie(jsonData.results[0]);
  };

  useEffect(() => {
    logJSONData();
  }, []);

  return (
    <div id="home">
      <img
        id="background-home-img"
        src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${movie.backdrop_path}`}
        alt="movie"
      />
      <div>
        <img
          id="home-img"
          src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${movie.poster_path}`}
          alt="movie"
        />
        <div id="info">
          <h2>Name: {movie.title}</h2>
          <h4>Release Date: {movie.release_date}</h4>
          <div id="rating">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
