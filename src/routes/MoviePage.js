import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style/moviePage.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Reviews from "../Shared/Reviews";
import { LinearProgress } from "@mui/material";
import SimilarMovies from "./MoviePageAttributes/SimilarMovies";
import MoviesCasts from "./MoviePageAttributes/MoviesCasts";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { auth, db } from "../firebase/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { MOVIES_API_KEY } from "../constants/common";
import ReactPlayer from 'react-player'

export default function MoviePage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [movie, setMovie] = useState({});
  const [movieLoading, setMovieLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const getMovie = useCallback(async () => {
    setMovieLoading(true);
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIES_API_KEY}&language=en-US`
    );
    let jsonData = await response.json();
    setMovieLoading(false);
    setMovie(jsonData);
  }, [movieId]);

  const getFavoriteList = async()=>{
    if(auth){
    const docRef = doc(db, "Users", `${auth.currentUser?.uid}`);
    const docSnap = await getDoc(docRef);
    let favoriteMovies = (docSnap.data().favoriteMovies);
    setIsFavorite(favoriteMovies.some(el=> el===movieId));
    }
  }

  useEffect(() => {
    getFavoriteList()
  }, [movieId]);

  const getVideos = async () => {
    let api_key = "8cc8bb5915e1ce414955be2f44bcb790";
    setVideoLoading(true);
    let response = await fetch(
      ` https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}&language=en-US`
    );
    let jsonData = await response.json();
    setVideoLoading(false);
    setVideos(jsonData.results.slice(0, 3));
  };
  useEffect(() => {
    getVideos();
  }, [movie]);

  const favoriteChanging = async () => {
    if(auth.currentUser){
      const favoriteRef = doc(db, "Users", `${auth?.currentUser.uid}`);
      if(!isFavorite){
      setIsFavorite(!isFavorite)
      await updateDoc(favoriteRef, {
        favoriteMovies: arrayUnion(`${movieId}`),
      })}else{
        setIsFavorite(!isFavorite)
      await updateDoc(favoriteRef, {
        favoriteMovies: arrayRemove(`${movieId}`),
      })
      }
    }else{
      navigate(`/registation`)
    }
  };

  useEffect(() => {
    if (movieId) {
      getMovie(movieId);
    }
  }, [movieId]);

  const onStartHandle = async ()=>{
    const historyRef = doc(db, "Users", `${auth.currentUser?.uid}`);
    await updateDoc(historyRef, {
      moviesHistory: arrayUnion(`${movieId}`),
    })
  }


  if (movieLoading || videoLoading) {
    return <LinearProgress />;
  }

  if (!movie) {
    return <h1>Nothing to Show</h1>;
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
          <h5>Description: {movie.overview}</h5>
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
              <div style={{ display: "flex" }} onClick={favoriteChanging}>
                {isFavorite ? (
                  <FavoriteIcon sx={{ fontSize: "35px", color: "red" }} />
                ) : (
                  <>
                    <FavoriteBorderIcon
                      sx={{ fontSize: "35px", color: "red" }}
                    />
                    <h6>Add to Watchlist</h6>
                  </>
                )}
              </div>
            </div>

            <p style={{ marginLeft: 20 }}>({movie.vote_count} votes)</p>
          </div>
        </div>
      </div>
      <MoviesCasts id={movie.id} />
      <div className="video">
        {videos.map((el) => (
          <>
            <ReactPlayer
              key={el.key}
              onStart={() => {
                onStartHandle();
              }}
              url={`https://www.youtube.com/embed/${el.key}`}
              controls={true}
            />
           
          </>
        ))}
      </div>
      <SimilarMovies id={movie.id} />
      <Reviews id={movie.id} />
    </div>
  );
}
