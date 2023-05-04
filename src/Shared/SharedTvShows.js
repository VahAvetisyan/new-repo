import React, {useEffect, useState} from "react"
import "../routes/style/actors.css"
import {useNavigate} from "react-router-dom"
import "../routes/style/responsive.css"

const SharedTvShows = (props) => {
  const type = props.type
  const navigate = useNavigate()
  let [movies, setActors] = useState([])
  let [page, setPage] = useState(1)

  const logJSONData = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/${type}?api_key=8cc8bb5915e1ce414955be2f44bcb790&language=en-US&page=${page}`
    )
    let jsonData = await response.json()
    setActors(jsonData.results)
  }

  useEffect(() => {
    logJSONData()
  }, [page])

  const handlerOnClick = (movie, id) => {
    navigate(`/movie/${id}`, {
      state: {
        movie: movie
      }
    })
  }

  return (
    <div id='actors'>
      <h2>Popular Movies</h2>
      <div id='actors-imgs-container'>
        {movies.map((movie) => (
          <div
            key={movie.original_title}
            onClick={() => {
              handlerOnClick(movie, movie.id)
            }}
          >
            <img
              className='actors-img'
              key={movie.original_title}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt='actor'
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
      <div id='buttons-div'>
        <button
          onClick={() => {
            if (page > 1) setPage(--page)
            window.scrollTo(0, 0)
          }}
        >
          ⮜
        </button>
        <b>PAGE {page}</b>
        <button
          onClick={() => {
            setPage(++page)
            window.scrollTo(0, 0)
          }}
        >
          ⮞
        </button>
      </div>
    </div>
  )
}

export default SharedTvShows
