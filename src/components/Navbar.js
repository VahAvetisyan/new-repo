import { menuItems } from "../MenuItems";
import MenuItems from "./MenuItems";
import "../App.css"
import Search from "./Search";


const Navbar = () => {
  return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />
        })}
        <Search />
      </ul>
    </nav>
  );
};

export default Navbar;
