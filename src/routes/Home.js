import React, { useEffect, useState } from "react";
import "./style/home.css";
import ImageSlider from "./ImageSlider";


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
    <div
      id="homepage"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div id="homepage-poster">
        <img
          id="home-img"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="movie"
        />
        <div id="info">
          <h2>Name: {movie.title}</h2>
          <h4>Release Date: {movie.release_date}</h4>
          <h5>Discription: {movie.overview}</h5>
        </div>
      </div>
      <div>
        <ImageSlider />
      </div>
    </div>
  );
};

export default Home;
