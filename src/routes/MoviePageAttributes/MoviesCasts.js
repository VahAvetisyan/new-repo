import {useEffect, useState} from "react"
import "../style/SimilarMovies.css"
import Slider from "react-slick"
import {LinearProgress} from "@mui/material"
import {useNavigate} from "react-router-dom"

export default function Casts({id}) {
  const navigate = useNavigate()
  const [casts, setCasts] = useState([])
  const GetCredits = async () => {
    if(id){
      let api_key = "8cc8bb5915e1ce414955be2f44bcb790"
      let response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=en-US`)
      let jsonData = await response.json()
      setCasts(jsonData.cast.slice(0, 10))
    }
  }

  useEffect(() => {
    GetCredits()
  }, [])

  function handleClick(actor, id) {
    navigate(`/people/${id}`, {
      state: {
        actor: actor
      }
    })
  }
  const settings = {
    infinite: false,
    slidesToShow: window.innerWidth <= 1445 ? 3 : 5,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000
  }

  if (!casts) {
    return <LinearProgress />
  }

  return (
    <>
      <div className='tag'>
        <h2>Top Casts</h2>
      </div>
      <div className='imgslider'>
        <Slider {...settings}>
          {casts.map((cast) =>
            cast.profile_path ? (
              <div
                key={cast.id}
                id='imgs-container'
                onClick={() => {
                  handleClick(cast, cast.id)
                }}
              >
                <div key={cast.name} id='nested-imgs-container'>
                  <img
                    key={cast.name}
                    src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                    alt='actor'
                  />
                  <h3 style={{color: "black"}}>{cast.name}</h3>
                  <h5 style={{color: "black"}}>{cast.character}</h5>
                </div>
              </div>
            ) : null
          )}
        </Slider>
      </div>
    </>
  )
}
