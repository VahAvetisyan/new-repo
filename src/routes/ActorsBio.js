import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style/actorBio.css";

export default function ActorsBio() {
  const location = useLocation("/people");
  const [actorBio, setActorBio] = useState({})
const a=1
  const navigate = useNavigate()

  const actor = location.state.actor;
  const knownFor = actor.known_for

  const getActorInfo = async () => {
    let api_key = "8cc8bb5915e1ce414955be2f44bcb790";
    let response = await fetch(
      `https://api.themoviedb.org/3/person/${actor.id}?api_key=${api_key}&language=en-US`
    );
    let jsonData = await response.json();
    setActorBio(jsonData);
  };
 
  useEffect(() => {
    getActorInfo();
  }, [actor]);

  const handlerOnClick = (movie, name) => {
    navigate(`/movie/${name}`,{state:{
      movie: movie,
    }})
  }

  return (
    <>
      <div id="actorPage-poster">
        <img
          id="home-img"
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
          alt="actor"
        />
        <div id="info">
          <h2>Name: {actorBio.name}</h2>
          <h5>Gender: {actorBio.gender==1?"Female" : "Male"}</h5>
          <h5>Popularity: {actorBio.popularity}</h5>
          {actorBio.place_of_birth? <h5>Place of birth: {actorBio.place_of_birth}</h5> : null}
          {actorBio.birthday? <h5>Birthday data: {actorBio.birthday}</h5> : null}
          {actorBio.biography? <h5>Biography: {actorBio.biography}</h5> : null}
        </div>   
      </div>
      <div className="img-div">
          {knownFor.map((movie) => (
              <div key={movie.id} onClick={()=>{handlerOnClick(movie, movie.original_title)}}>
                <img
                  key={movie.original_title}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt="actor-img"
                />
                <h3>{movie.original_title}</h3>
              </div>
          ))}
       </div>
      </>

  );
}
