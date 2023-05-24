import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./style/imageSlider.css"
import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import Responsive from "../Shared/Responsive"

const ImageSlider = () => {
  const navigate = useNavigate()
  let [movie, setMovie] = useState([])
  let screenSize = Responsive()

  const logJSONData = async () => {
    let api_key = "8cc8bb5915e1ce414955be2f44bcb790"
    let response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`
    )
    let jsonData = await response.json()
    setMovie(jsonData.results)
  }

  const handlerOnClick = (movie, id) => {
    
      movie.media_type === "tv"
        ? navigate(`/tv-show/${id}`, {
            state: {
              movie: movie
            }
          })
        : navigate(`/movie/${id}`, {
            state: {
              movie: movie
            }
          })
    
  }

  useEffect(() => {
    logJSONData()
  }, [])

  const settings = {
    infinite: true,
    slidesToShow: screenSize,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
    
  }

  return (
    <div>
      <div className='tag' >
        <h2>Trending Today</h2>
      </div>
      <div className='imgslider' >
        <Slider {...settings}>
          {movie.map((movie) =>
            movie.poster_path ? (
              <div key={movie.id} id='imgs-container'>
                <div
                  key={movie.original_title}
                  id='nested-imgs-container'
                  onClick={() => {
                    handlerOnClick(movie, movie.id)
                  }}
                >
                  <img
                    key={movie.original_title}
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt='actor'
                  />
                  <h5 style={{color: "black"}}>{movie.title}</h5>
                </div>
              </div>
            ) : null
          )}
        </Slider>
      </div>
    </div>
  )
}
export default ImageSlider
