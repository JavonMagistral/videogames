import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={style.nav}>
      <div className={style.navButtons}>
        <button>
          <NavLink to="/NewVideoGame">New Video Game</NavLink>
        </button>
        <button>
          <NavLink to="/About">About</NavLink>
        </button>
        <button>
          <NavLink to="/home">Home</NavLink>
        </button>
        <button>
          <NavLink to="/">OutLog</NavLink>
        </button>
      </div>
    </div>
  );
};

export default Nav;