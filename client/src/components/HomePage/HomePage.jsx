import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getVideogames,
  filterByGenres,
  sortVideoGames,
  filterByOrigin
} from "../../Redux/actions";
import CardDetails from "../CardDetails/CardDetails"; 
import Paginado from "../Paginado/Paginado";
import style from "./HomePage.module.css";
import SearchBar from "../SearchBar/SearchBar";

const HomePage = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.filteredVideoGames);
  const [currentPage, setCurrentPage] = useState(1);
  const [videoGamesPerPage] = useState(15);
 
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  const handleFilterByGenres = (event) => {
    dispatch(filterByGenres(event.target.value));
  };

  const handleSort = (event) => {
    dispatch(sortVideoGames(event.target.value));
  };

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
    setCurrentPage(1);
  }

  const lastVideoGameIndex = currentPage * videoGamesPerPage;
  const firstVideoGameIndex = lastVideoGameIndex - videoGamesPerPage;
  const currentVideoGames = videogames.slice(
    firstVideoGameIndex,
    lastVideoGameIndex
  );

  return (
    <div className={style.homePage}>
      <div className={style.filters}>
        <select className={style.select} onChange={handleSort}>
          <option value="default">Orden Default</option>
          <option value="rating_asc">Rating Ascendente</option>
          <option value="rating_desc">Rating Descendente</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="alphabetical_desc">Alphabetical Descendente</option>
        </select>

        <select className={style.select} onChange={handleFilterByOrigin}>
          <option value="All">All</option>
          <option value="DataBase">Data Base</option>
          <option value="API">API</option>
        </select>

        <select className={style.select} onChange={handleFilterByGenres}>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Indie">Indie</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Strategy</option>
          <option value="Shooter">Shooter</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulation</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Arcade">Arcade</option>
          <option value="Platformer">Platformer</option>
          <option value="Massively Multiplayer">Massively Multiplayer</option>
          <option value="Racing">Racing</option>
          <option value="Sports">Sports</option>
          <option value="Fighting">Fighting</option>
          <option value="Family">Family</option>
          <option value="Board Games">Board Games</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
        </select>
      </div>

      <div className={style.content}>
      <SearchBar/>
        <Paginado
          videogamesPerPage={videoGamesPerPage}
          videogames={videogames.length}
          paginado={paginado}
        />
       
        <CardDetails currentVideoGames={currentVideoGames} />
      </div>
    </div>
  );
};

export default HomePage;
