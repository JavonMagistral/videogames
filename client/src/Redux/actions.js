// actions.js
import axios from 'axios';
import { GET_VIDEOGAMES, FILTER_BY_GENRES, SORT_VIDEOGAMES } from "./actions-types";

const endpoint = "http://localhost:3001";

export const getVideogames = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${endpoint}/videogames`);
      if (!data) {
        throw Error("No llegan los datos");
      }
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterByGenres = (payload) => {
  return {
    type: FILTER_BY_GENRES,
    payload,
  };
};

export const sortVideoGames = (payload) => {
  return {
    type: SORT_VIDEOGAMES,
    payload,
  };
};
