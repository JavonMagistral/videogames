 import {
    GET_VIDEOGAMES,
    FILTER_BY_GENRES,
    SORT_VIDEOGAMES,
    FILTER_BY_ORIGIN,
    GET_VIDEOGAME_NAME,
    GET_GENRES,
    POST_VIDEOGAME,

  } from "./actions-types";
  
  const initialState = {
    allVideogames: [],
    filteredVideoGames: [],
    sortOrder: "default",
    showPageCreated: true,
    videogamesCopy: [],
    allGenres: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_VIDEOGAMES:
        return {
          ...state,
          allVideogames: action.payload,
          filteredVideoGames: action.payload, // Inicialmente, establece los videojuegos filtrados como todos los videojuegos
        };
      case GET_GENRES:
        return {
          ...state,
          allGenres: action.payload,
        }
        
        case POST_VIDEOGAME:
          // Actualiza el estado agregando el nuevo videojuego a la lista de videojuegos existente
          return {
            ...state,
      
          };

      case FILTER_BY_GENRES:
        const genre = action.payload;
        let filteredByGenre;
        if (genre === "All") {
          filteredByGenre = state.allVideogames;
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
          } else if (action.payload === "alphabetical") {
            sortedVideoGames.sort((a, b) => a.name.localeCompare(b.name));
          } else if (action.payload === "alphabetical_desc") {
            sortedVideoGames.sort((a, b) => b.name.localeCompare(a.name));
          } else if (action.payload === "default") {
            return {
              ...state,
              sortOrder: action.payload,
              filteredVideoGames: [...state.allVideogames],
            };
          }
          return {
            ...state,
            sortOrder: action.payload,
            filteredVideoGames: sortedVideoGames,
          };
          case FILTER_BY_ORIGIN:
            const allVideogames2 = state.allVideogames;
            const isFromDataBase = action.payload === "DataBase"; // Comprobamos si queremos filtrar por base de datos
          
            // Filtrar videojuegos según el origen
            const filteredVideoGames = isFromDataBase
              ? allVideogames2.filter(vg => typeof vg.id !== 'number') // Filtrar los de la base de datos (ID no numérico)
              : allVideogames2.filter(vg => typeof vg.id === 'number'); // Filtrar los de la API (ID numérico)

            return {
              ...state,
              filteredVideoGames: action.payload === "All" ? state.allVideogames : filteredVideoGames
            };
                      
            case GET_VIDEOGAME_NAME:
              
              return {
                ...state,
               filteredVideoGames: action.payload,
                
              };
  
      default:
        return { ...state };
    }
  };
  
  export default reducer;
  