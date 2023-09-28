// actions.js
import axios from 'axios';
import { GET_VIDEOGAMES, FILTER_BY_GENRES, SORT_VIDEOGAMES, FILTER_BY_ORIGIN, GET_VIDEOGAME_NAME, POST_VIDEOGAME, GET_GENRES } from "./actions-types";

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

export const filterByOrigin = (payload) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  }
}

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${endpoint}/genres`);
      if (!data) {
        throw Error("No llegan los datos");
      }
      return dispatch({
        type: GET_GENRES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const postVideoGame = (payload) => {
  console.log(payload);
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${endpoint}/videogame`, payload);
      
      return dispatch({
        type: POST_VIDEOGAME,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}


export const getVideogameName = (name) => {
  return async (dispatch) => {
    try{
      const { data } = await axios.get(
      `http://localhost:3001/videogame?name=${name}`
    );
    dispatch({
      type: GET_VIDEOGAME_NAME,
      payload: data,
    });
    }
    catch(error){
      console.log(error);
    }
    
  };
};

