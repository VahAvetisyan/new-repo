import React, { useEffect, useState } from "react";
import "./style/home.css";
import ImageSlider from "./ImageSlider";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
const Home = () => {
  let [movie, setMovie] = useState({});
  const navigate = useNavigate()

  const logJSONData = async () => {
    let api_key = "8cc8bb5915e1ce414955be2f44bcb790";
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
    );
    let jsonData = await response.json();
    setMovie(jsonData.results[0]);
  };
  const handlerOnClick = () => {
    navigate(`/movie/${movie.id}`,{state:{
      id: movie.id,
    }})
  }

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
      <div id="homepage-poster" onClick={handlerOnClick}>
        <img
          id="home-img"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="movie"
        />
        <div id="info">
          <h2>{movie.title}</h2>
          <h4>Release Date: {movie.release_date}</h4>
          <h5>Description: {movie.overview}</h5>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 50, height: 50 }}>
              <CircularProgressbar
                value={movie.vote_average * 10}
                text={
                  <tspan dy={5} dx={-22}>
                    {movie.vote_average * 10}%
                  </tspan>
                }
                styles={buildStyles({
                  rotation: 0,
                  strokeLinecap: "butt",
                  textSize: "25px",
                  pathTransitionDuration: 0,
                  pathColor: `green`,
                  textColor: "white",
                  trailColor: "red",
                  backgroundColor: "#d6d6d6",
                })}
              />
            </div>
            <p style={{ marginLeft: 20 }}>({movie.vote_count} votes)</p>
          </div>
        </div>
      </div>
      <div>
        <ImageSlider />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
