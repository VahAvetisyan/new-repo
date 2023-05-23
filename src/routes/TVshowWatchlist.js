import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import { MOVIES_API_KEY } from "../constants/common";
import "./style/watchlist.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TvShowWatchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const navigate = useNavigate();

  const getFavoriteList = async () => {
    if (auth) {
      const docRef = doc(db, "Users", `${auth.currentUser.uid}`);
      const docSnap = await getDoc(docRef);
      setMoviesList(docSnap.data().favoriteTvShows);
    }
  };

  const getMovies = async (id) => {
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${MOVIES_API_KEY}&language=en-US`
    );
    let jsonData = await response.json();
    setWatchlist((watchlist) => [...watchlist, jsonData]);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      for (const id of moviesList) {
        await getMovies(id);
      }
    };
    fetchMovies();
  }, [moviesList]);

  useEffect(() => {
    getFavoriteList();
  }, []);

  if (watchlist.length === 0) {
    return "The watchlist is empty";
  }

  async function removeFavorite(movieId) {
    const favoriteRef = doc(db, "Users", `${auth?.currentUser.uid}`);
    await updateDoc(favoriteRef, {
      favoriteTvShows: arrayRemove(`${movieId}`),
    });
    setWatchlist((watchlist) =>
      watchlist.filter((movie) => movie.id !== movieId)
    );
  }
  function handleClick(id) {
    navigate(`/tv-show/${id}`);
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
      {watchlist.map((movie) =>
        movie ? (
          <Card
            key={movie.id}
            variant="outlined"
            sx={{
              width: 300,
              marginBottom: "25px",
              borderRadius: "10px",
            }}
          >
            <AspectRatio>
              <img
                onClick={() => {
                  handleClick(movie.id);
                }}
                style={{ cursor: "pointer" }}
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              />
            </AspectRatio>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div>
                <Typography mt={2}>{movie.name}</Typography>
                <Typography level="body2">{movie.first_air_date}</Typography>
              </div>
              <button
                className="removeFavorite"
                style={{ width: "50px", height: `50px`, textAlign: "center" }}
                onClick={() => {
                  removeFavorite(movie.id);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          </Card>
        ) : null
      )}
    </List>
  );
}
