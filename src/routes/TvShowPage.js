import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "./style/moviePage.css"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export default function MoviePage() {
    const location = useLocation("/movie");
    let [videos, setVideos] = useState([]);

 const movie = location.state.movie;
console.log(location);


 const getVideos = async () => {
   let api_key = "8cc8bb5915e1ce414955be2f44bcb790";
   let response = await fetch(
     `https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${api_key}&language=en-US`
   );
   let jsonData = await response.json();
   console.log(jsonData)
   setVideos((jsonData.results).slice(0,3))
 };
 useEffect(() => {
    getVideos();
  }, [movie]);

 
    return (
      <div
        id="homepage"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <div id="homepage-poster">
          <img
            id="home-img"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="movie"
          />
          <div id="info">
            <h2>Name: {movie.name}</h2>
            <h4>Release Date: {movie.first_air_date}</h4>
            <h5>Discription: {movie.overview}</h5>
            <div style={{display: "flex", alignItems: "center"}}>
          <div style={{ width: 50, height: 50}}>
            <CircularProgressbar
              value={movie.vote_average*10}
              text = {<tspan dy={5} dx={-22}>{movie.vote_average*10}%</tspan>}
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
          <p style={{marginLeft: 20}}>({movie.vote_count} votes)</p>
          </div>
          </div>
          
          
      </div>
      <div className='video'>
                {videos.map((el) => (
                    <iframe key={el.key} width="400" height="250" src={`https://www.youtube.com/embed/${el.key}`} title="YouTube video player"
                        frameBorder="0" allowfullscreen="allowfullscreen"></iframe>
                ))}
        </div>
        </div>
    
        
    )
}
