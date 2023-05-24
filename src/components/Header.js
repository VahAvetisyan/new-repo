import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
const Header = (props) => {
  let loggedInUser = props.isLoggedInUser;
  return (
    <header style={{ background: "black" }}>
      <div className="nav-area">
        <Link to="/" className="logo" style={{ color: "#1f472b" }}>
          <LocalMoviesIcon /> Cinema ASD
        </Link>
        <Navbar isLoggedInUser={loggedInUser} />
      </div>
    </header>
  );
};

export default Header;
