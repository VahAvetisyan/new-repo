import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";


export default function CustomizedRating() {
    let [movie, setMovie] = React.useState({});

    const logJSONData = async () => {
      let api_key = "8cc8bb5915e1ce414955be2f44bcb790";
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
      );
      let jsonData = await response.json();
      setMovie(jsonData.results[0]);
    };
  
    React.useEffect(() => {
      logJSONData();
    }, []);

  return (
    <Rating
  name="simple-controlled"
  value={movie.vote_average}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
/>
  );
}

