import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/imageSlider.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ImageSlider = () => {
  const navigate = useNavigate()
  let [movie, setMovie] = useState([]);

  const logJSONData = async () => {
    let api_key = "8cc8bb5915e1ce414955be2f44bcb790";
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
    );
    let jsonData = await response.json();
    setMovie(jsonData.results);
  };

  const handlerOnClick = (movie, name) => {
    navigate(`/movie/${name}`,{state:{
      movie: movie,
    }})
  }

  useEffect(() => {
    logJSONData();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="tag">
        <h2>
          <a href="movies/popular">Popular Movies</a>
        </h2>
      </div>
      <div className="imgslider">
        <Slider {...settings}>
          {movie.map((movie) => (
            <div key={movie.id} id="imgs-container">
              <div key={movie.original_title} id="nested-imgs-container" onClick={()=>{handlerOnClick(movie, movie.original_title)}}>
                <img
                  key={movie.original_title}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt="actor"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
export default ImageSlider;
