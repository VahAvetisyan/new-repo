import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style/moviePage.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import MovieReviews from "./MoviePageAttributes/MovieReviews";
import { LinearProgress } from "@mui/material";
import SimilarMovies from "./MoviePageAttributes/SimilarMovies";
import MoviesCasts from "./MoviePageAttributes/MoviesCasts";

export default function MoviePage() {
  const { movieId } = useParams();
  const [videos, setVideos] = useState([]);
  const [movie, setMovie] = useState({});

  const getMovie = useCallback(async () => {
    let api_key = "8cc8bb5915e1ce414955be2f44bcb790";
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`
    );
    let jsonData = await response.json();
    setMovie(jsonData);
  }, [movieId]);

  useEffect(() => {
    if (movieId) {
      getMovie(movieId);
    }
  }, [movieId]);

  const getVideos = async () => {
    let api_key = "8cc8bb5915e1ce414955be2f44bcb790";
    let response = await fetch(
      ` https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}&language=en-US`
    );
    let jsonData = await response.json();
    setVideos(jsonData.results.slice(0, 3));
  };
  useEffect(() => {
    getVideos();
  }, [movie]);

  if (!movie || !videos.length) {
    return <LinearProgress />;
  }
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
          <h2>{movie.title}</h2>
          <h4>Release Date: {movie.release_date}</h4>
          <h5>Discription: {movie.overview}</h5>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 50, height: 50 }}>
              <CircularProgressbar
                value={movie.vote_average * 10}
                text={
                  <tspan dy={5} dx={-22}>
                    {Math.floor(movie.vote_average * 10)}%
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
      <MoviesCasts id={movie.id}/>
      <div className="video">
        {videos.map((el) => (
          <iframe
            key={el.key}
            width="400"
            height="250"
            src={`https://www.youtube.com/embed/${el.key}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen="allowfullscreen"
          ></iframe>
        ))}
      </div>
        <SimilarMovies id={movie.id} />     
      <MovieReviews id={movie.id} />
    </div>
  );
}
