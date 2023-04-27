import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = (props) => {
  let loggedInUser = props.isLoggedInUser;
  return (
    <div>
      <Header isLoggedInUser={loggedInUser} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
