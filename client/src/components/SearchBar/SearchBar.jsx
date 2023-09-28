import { useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { getVideogameName } from "../../Redux/actions";

const SearchBar = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");


     const handleChange = (event) => {
        
        setName(event.target.value);
    }
    const handleKeyPress = (event) => {
        if(event.key === "Enter"){
            dispatch(getVideogameName(name));
        }
    }
    console.log(name);
    return (
        <div>
            <input type="search" onChange={handleChange} onKeyDown={handleKeyPress} value={name} />
            <button type="submit" onClick={(event) => handleKeyPress(event)}>Search</button>
        </div>
    )

    
}

export default SearchBar;