import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useEffect } from "react";
import { useState } from "react";
import { LinearProgress } from "@mui/material";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import Card from "@mui/joy/Card";
import { MOVIES_API_KEY } from "../constants/common";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [moviesList, setMoviesList] = useState([]);

  const getFavoriteList = async () => {
    if (auth) {
      const docRef = doc(db, "Users", `${auth.currentUser.uid}`);
      const docSnap = await getDoc(docRef);
      setMoviesList(docSnap.data().favoriteMovies);
    }
  };

  const getMovies = async (id) => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIES_API_KEY}&language=en-US`
    )
    let jsonData = await response.json()
      watchlist.push(jsonData)
  }
useEffect(()=>{
  moviesList.map(async(id)=>{
    getMovies(id)
 })
},[])
  

  useEffect(() => {
    getFavoriteList();
  }, []);

  if (watchlist.length === 0) {
    return <LinearProgress />;
  }

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {watchlist.map((movie) => (
        movie?
        <Card key={movie.id} variant="outlined" sx={{ width: 300, marginBottom: '25px' }}>
          <AspectRatio>
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
          </AspectRatio>
          <Typography mt={2}>{movie.title}</Typography>
          <Typography level="body2">{movie.release_date}</Typography>
        </Card>:null
      ))}
    </List>
  );
}
