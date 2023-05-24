import { menuItems, profile } from "./NavItems"
import MenuItems from "./MenuItems"
import "../App.css"
import Search from "./Search"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import LogoutIcon from "@mui/icons-material/Logout"

const onLogOutClick = () => {
  signOut(auth)
    .then(() => {
    })
    .catch((error) => {
      console.log(error.message)
    })
}

const Navbar = (props) => {
  let loggedInUser = props.isLoggedInUser


  return (
    <nav>
      {loggedInUser ? (
        <ul className="menus" style={{ color: "black" }}>
          {menuItems.map((menu, index) => {
            const depthLevel = 0;
            return (
              <MenuItems items={menu} key={index} depthLevel={depthLevel} />
            );
          })}
          <Search />
          {profile.map((menu, index) => {
            const depthLevel = 0;
            return (
              <MenuItems
                items={menu}
                key={index}
                depthLevel={depthLevel}
                style={{ background: "#45A29E" }}
              />
            );
          })}
          <div className="logOut">
            <button onClick={onLogOutClick}>
              <LogoutIcon />
            </button>
          </div>
        </ul>
      ) : (
        <ul className="menus">
          {menuItems.map((menu, index) => {
            const depthLevel = 0;
            return (
              <MenuItems items={menu} key={index} depthLevel={depthLevel} />
            );
          })}
          <Search />
          <div className="signInSignUpButtons">
            <button>
              <a href="/registation">Sing In/Sign Up</a>
            </button>
          </div>
        </ul>
      )}
    </nav>
  );
}

export default Navbar
