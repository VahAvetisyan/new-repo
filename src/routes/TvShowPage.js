import React, {useCallback, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import "./style/moviePage.css"
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import {LinearProgress} from "@mui/material"
import TvShowsReviews from "./MoviePageAttributes/TvShowsReviews"
import SimilarTVShows from "./MoviePageAttributes/SimilarTVShows"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import {auth, db} from "../firebase/firebase"
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc
} from "firebase/firestore"
import {MOVIES_API_KEY} from "../constants/common"

export default function MoviePage() {
  const {tvId} = useParams()
  const [videos, setVideos] = useState([])
  const [movie, setMovie] = useState(null)
  const [movieLoading, setMovieLoading] = useState(false)
  const [videoLoading, setVideoLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const getMovie = useCallback(async (tvId) => {
    setMovieLoading(true)
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}?api_key=${MOVIES_API_KEY}&language=en-US`
    )
    let jsonData = await response.json()
    setMovieLoading(false)
    setMovie(jsonData)
  }, [])

  useEffect(() => {
    if (tvId) {
      getMovie(tvId)
    }
  }, [tvId])

  const getVideos = async () => {
    setVideoLoading(true)
    let response = await fetch(
      ` https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${MOVIES_API_KEY}&language=en-US`
    )
    let jsonData = await response.json()
    setVideoLoading(false)
    setVideos(jsonData.results.slice(0, 3))
  }
  const getFavoriteList = async () => {
    if (auth) {
      const docRef = doc(db, "Users", `${auth.currentUser.uid}`)
      const docSnap = await getDoc(docRef)
      let favoriteTvShows = docSnap.data().favoriteTvShows
      setIsFavorite(favoriteTvShows.some((el) => el === tvId))
    }
  }

  useEffect(() => {
    getFavoriteList()
  }, [tvId])

  const favoriteChanging = async () => {
    const favoriteRef = doc(db, "Users", `${auth?.currentUser.uid}`)
    if (!isFavorite) {
      setIsFavorite(!isFavorite)
      await updateDoc(favoriteRef, {
        favoriteTvShows: arrayUnion(`${tvId}`)
      })
    } else {
      setIsFavorite(!isFavorite)
      await updateDoc(favoriteRef, {
        favoriteTvShows: arrayRemove(`${tvId}`)
      })
    }
  }
  useEffect(() => {
    getVideos()
  }, [movie])

  if (movieLoading || videoLoading) {
    return <LinearProgress />
  }

  if (!movie) {
    return <h1>Nothing to Show</h1>
  }

  return (
    <div
      id='homepage'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <div id='homepage-poster'>
        <img
          id='home-img'
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt='movie'
        />
        <div id='info'>
          <h2>{movie.name}</h2>
          <h4>Release Date: {movie.first_air_date}</h4>
          <h5>Discription: {movie.overview}</h5>
          <div style={{display: "flex", alignItems: "center"}}>
            <div style={{width: 50, height: 50}}>
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
                  backgroundColor: "#d6d6d6"
                })}
              />
              <div style={{display: "flex"}} onClick={favoriteChanging}>
                {isFavorite ? (
                  <FavoriteIcon sx={{fontSize: "35px", color: "red"}} />
                ) : (
                  <>
                    <FavoriteBorderIcon sx={{fontSize: "35px", color: "red"}} />
                    <h6>Add to Watchlist</h6>
                  </>
                )}
              </div>
            </div>
            <p style={{marginLeft: 20}}>({movie.vote_count} votes)</p>
          </div>
        </div>
      </div>
      <div className='video'>
        {videos.map((el) => (
          <iframe
            key={el.key}
            width='400'
            height='250'
            src={`https://www.youtube.com/embed/${el.key}`}
            title='YouTube video player'
            frameBorder='0'
            allowFullScreen='allowfullscreen'
          ></iframe>
        ))}
      </div>
      <SimilarTVShows id={movie.id} />
      <TvShowsReviews id={movie.id} />
    </div>
  )
}
