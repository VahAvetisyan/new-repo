import Navbar from "./Navbar";
import { Link } from "react-router-dom";
const Header = (props) => {
  let loggedInUser = props.isLoggedInUser;
  return (
    <header style={{ background: "black" }}>
      <div className="nav-area">
        <Link to="/" className="logo" style={{ color: "#1f472b" }}>
          <img style={{height: '60px', paddingTop: '10px'}} src="https://i.imgur.com/u7D9vYW.png"/>
        </Link>
        <Navbar isLoggedInUser={loggedInUser} />
      </div>
    </header>
  );
};

export default Header;
