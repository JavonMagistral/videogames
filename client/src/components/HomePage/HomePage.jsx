import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getVideogames,
  filterByGenres,
  sortVideoGames,
} from "../../Redux/actions";
import CardDetails from "../CardDetails/CardDetails";
import Paginado from "../Paginado/Paginado";
import "./HomePage.css";

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

  const lastVideoGameIndex = currentPage * videoGamesPerPage;
  const firstVideoGameIndex = lastVideoGameIndex - videoGamesPerPage;
  const currentVideoGames = videogames.slice(
    firstVideoGameIndex,
    lastVideoGameIndex
  );

  return (
    <div>
      <select onChange={handleSort}>
        <option value="default">Orden Default</option>
        <option value="rating_asc">Rating Ascendente</option>
        <option value="rating_desc">Rating Descendente</option>
      </select>

      <select onChange={handleFilterByGenres}>
        <option value="All">All</option>
        <option value="Action">Action</option>
        {/* Agrega más opciones de género aquí */}
      </select>

      <div>
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
