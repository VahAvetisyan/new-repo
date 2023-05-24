import React, {useEffect, useState} from "react"
import "./style/actors.css"
import {useLocation, useNavigate} from "react-router-dom"

const ActorSearchResult = () => {
  let [actor, setActor] = useState([])
  const navigate = useNavigate()
  const location = useLocation("search-result")
  let actorArr = location.state.actors

  useEffect(() => {
    setActor(actorArr)
  }, [actorArr])

  const handlerOnClick = (actor, id) => {
    navigate(`/people/${id}`, {
      state: {
        actor: actor
      }
    })
  }

  return (
    <div id="actors">
      <h2>Finded Actors:</h2>
      <div id="actors-imgs-container">
        {actor?.map((actor) =>
          actor.profile_path ? (
            <div
              style={{minWidth: "200px", marginRight: "20px"}}
              key={actor.id}
              onClick={() => {
                handlerOnClick(actor, actor.id)
              }}
            >
              <img
                className="actors-img"
                key={actor.name}
                src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                alt="actor"
              />
              <h3>{actor.name}</h3>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

export default ActorSearchResult
