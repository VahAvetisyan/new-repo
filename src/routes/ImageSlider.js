import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./style/imageSlider.css"
import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

const ImageSlider = () => {
  const navigate = useNavigate()
  let [movie, setMovie] = useState([])
  let [width, setWidth] = useState(5)
  const logJSONData = async () => {
    let api_key = "8cc8bb5915e1ce414955be2f44bcb790"
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
    )
    let jsonData = await response.json()
    setMovie(jsonData.results)
  }

  const handlerOnClick = (movie, id) => {
    navigate(`/movie/${id}`, {
      state: {
        movie: movie
      }
    })
  }

  window.addEventListener("resize", ()=>{
    if (window.innerWidth <= 1400) {
      setWidth(3)
    } else {
      setWidth(5)
    }
  })


  useEffect(() => {
    logJSONData()
  }, [])

  const settings = {
    infinite: true,
    slidesToShow: width,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000
  }

  return (
    <>
      <div className='tag'>
        <h2>
          <a href='movies/popular'>Popular Movies</a>
        </h2>
      </div>
      <div className='imgslider'>
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
                  <h5 style={{color: "white"}}>{movie.original_title}</h5>
                </div>
              </div>
            ) : null
          )}
        </Slider>
      </div>
    </>
  )
}
export default ImageSlider
