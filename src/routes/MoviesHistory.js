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

export default function MoviesHistory() {
  const [history, setHistory] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const navigate = useNavigate();

  const getFavoriteList = async () => {
    if (auth) {
      const docRef = doc(db, "Users", `${auth.currentUser.uid}`);
      const docSnap = await getDoc(docRef);
      setMoviesList(docSnap.data().moviesHistory);
    }
  };

  const getMovies = async (id) => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIES_API_KEY}&language=en-US`
    );
    let jsonData = await response.json();
    setHistory((history) => [...history, jsonData]);
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

  if (history.length === 0) {
    return "The history is  empty";
  }

  async function removeFavorite(movieId) {
    const historyRef = doc(db, "Users", `${auth?.currentUser.uid}`);
    await updateDoc(historyRef, {
      moviesHistory: arrayRemove(`${movieId}`),
    });
    setHistory((history) =>
      history.filter((movie) => movie.id !== movieId)
    );
  }
  function handleClick(id) {
    navigate(`/movie/${id}`);
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
      {history.map((movie) =>
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
                src={`https://image.tmdb.org/t/p/original/${
                  movie.backdrop_path ? movie.backdrop_path : movie.poster_path
                }`}
              />
            </AspectRatio>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "5px",
              }}
            >
              <div>
                <Typography mt={2}>{movie.title}</Typography>
                <Typography level="body2">{movie.release_date}</Typography>
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
