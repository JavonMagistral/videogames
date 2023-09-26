import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Nav = ({onSearch}) => {
    return (
        <div>

        <SearchBar onSearch={onSearch}/>
        <div>
            <button><NavLink to="/NewVideoGame">New Video Game</NavLink></button>
            <button><NavLink to="/About">About</NavLink></button>
            <button><NavLink to="/home">Home</NavLink></button>
            <button><NavLink to="/">OutLog</NavLink></button>
        </div>


        </div>
    )
}

export default Nav;