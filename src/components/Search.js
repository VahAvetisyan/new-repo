import React, { useEffect, useState } from "react";
import "../App.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  let [searchValue, setSearchValue] = useState("");
  let [searchResult, setSearchResult] = useState([]);
  const api_key = "8cc8bb5915e1ce414955be2f44bcb790";

  const getSearchResult = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchValue}&page=1&include_adult=false`
    );
    let jsonData = await response.json();
    setSearchResult(jsonData.results);
    console.log(searchResult)
  };
  useEffect(() => {
    getSearchResult();
  }, [searchValue]);
  const keyDownHandler = (e) => {
    if (e.code === "Enter") {
      navigate("search-result", { state: { movies: searchResult } });
    }
  };
  const onClickHandler = () => {
    navigate("search-result", { state: { movies: searchResult } });
  };

  return (
    <div id="search-div">
      <input
        id="search-input"
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onKeyDown={(e) => keyDownHandler(e)}
      />
      <button
        id="search-button"
        onClick={() => {
          onClickHandler();
        }}
      >
        <SearchIcon />
      </button>
    </div>
  );
}
