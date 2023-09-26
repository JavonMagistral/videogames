import { useState } from "react";

const SearchBar = ({onSearch}) => {

    const [name, setName] = useState("");
    const handleChange = (event) => {
        setName(event.target.value);
    }
    const handleKeyPress = (event) => {
        if (event.key === "Enter"){
            onSearch(name);
                setName("");
        }
      
    }
    console.log(name);
    return (
        <div>
            <input type="search" onChange={handleChange} onKeyDown={handleKeyPress} value={name} />
            <button onClick={() => {onSearch(name); setName("");}}>Search</button>
        </div>
    )

    
}

export default SearchBar;