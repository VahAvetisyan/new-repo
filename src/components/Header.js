import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Header = (props) => {
  let loggedInUser = props.isLoggedInUser;
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          Cinema ASD
        </Link>
        <Navbar isLoggedInUser={loggedInUser}/>
      </div>
    </header>
  );
};

export default Header;
