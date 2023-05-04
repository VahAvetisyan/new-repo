import React, { useEffect, useState } from "react";
import "./style/actors.css";
import { useNavigate } from "react-router-dom";
import { linkClasses } from "@mui/material";
import "./style/responsive.css";
const Actors = () => {
  const navigate = useNavigate()
  let [actors, setActors] = useState([]);
  let [page, setPage] = useState(1);

  const logJSONData = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=8cc8bb5915e1ce414955be2f44bcb790&language=en-US&page=${page}`
    );
    let jsonData = await response.json();
    setActors(jsonData.results);
  };

  const handlerOnClick = (actor, id) => {
    navigate(`/people/${id}`,{state:{
      actor: actor,
    }})
  }
  

  useEffect(() => {
    logJSONData();
  }, [page]);

  return (
    <div id="actors">
      <h2>Popular People</h2>
      <div id="actors-imgs-container">
        {actors.map((actor) => (
          <div key={actor.name} onClick={()=>{handlerOnClick(actor, actor.id)}}>
            <img
              className="actors-img"
              key={actor.name}
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt="actor"
            />
            <h3>{actor.name}</h3>
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

export default Actors;
