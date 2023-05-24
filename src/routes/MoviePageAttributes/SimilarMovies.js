import {useEffect, useState} from "react"
import "../style/SimilarMovies.css"
import {useNavigate} from "react-router-dom"
import Slider from "react-slick"
import {LinearProgress} from "@mui/material"
import Responsive from "../../Shared/Responsive"
import { MOVIES_API_KEY } from "../../constants/common"

export default function SimilarMovies({id}) {
  const navigate = useNavigate()
  const [similarMovies, setSimilarMovies] = useState([])
  let screenSize = Responsive()

  const getSimilarMovies = async () => {
    if(!id) return
    let response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${MOVIES_API_KEY}&language=en-US&page=1`)
    let jsonData = await response.json()
    setSimilarMovies(jsonData.results)
  }

  useEffect(() => {
    getSimilarMovies()
  }, [id])

  const handlerOnClick = (movie, id) => {
    navigate(`/movie/${id}`, {
      state: {
        movie: movie
      }
    })
  }

  const settings = {
    infinite: true,
    slidesToShow: screenSize,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  }

  if (!similarMovies) {
    return <LinearProgress />
  }

  return (
    <>
      <div className="tag">
        <h2>Similar Movies</h2>
      </div>
      <div className="imgslider">
        <Slider {...settings} >
          {similarMovies.map((movie) =>
            movie.poster_path ? (
              <div key={movie.id} id="imgs-container">
                <div
                  key={movie.original_title}
                  id="nested-imgs-container"
                  onClick={() => {
                    handlerOnClick(movie, movie.id);
                  }}
                >
                  <img
                    key={movie.original_title}
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt="actor"
                  />
                  <h5>{movie.title}</h5>
                </div>
              </div>
            ) : null
          )}
        </Slider>
      </div>
    </>
  );
}
