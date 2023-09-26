import {
    GET_VIDEOGAMES,
    FILTER_BY_GENRES,
    SORT_VIDEOGAMES,
  } from "./actions-types";
  
  const initialState = {
    allVideogames: [],
    filteredVideoGames: [],
    sortOrder: "default",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_VIDEOGAMES:
        return {
          ...state,
          allVideogames: action.payload,
          filteredVideoGames: action.payload, // Inicialmente, establece los videojuegos filtrados como todos los videojuegos
        };
  
      case FILTER_BY_GENRES:
        const genre = action.payload;
        let filteredByGenre;
        if (genre === "All") {
          filteredByGenre = [...state.allVideogames];
        } else {
          filteredByGenre = state.allVideogames.filter((vg) => {
            return vg.genres.includes(genre);
          });
        }
        return {
          ...state,
          filteredVideoGames: filteredByGenre,
        };
  
      case SORT_VIDEOGAMES:
        let sortedVideoGames = [...state.filteredVideoGames];
        if (action.payload === "rating_asc") {
          sortedVideoGames.sort((a, b) => a.rating - b.rating);
        } else if (action.payload === "rating_desc") {
          sortedVideoGames.sort((a, b) => b.rating - a.rating);
        }
        return {
          ...state,
          sortOrder: action.payload,
          filteredVideoGames: sortedVideoGames,
        };
  
      default:
        return { ...state };
    }
  };
  
  export default reducer;
  