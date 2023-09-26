const URL = "https://api.rawg.io/api/games/"; 
const axios = require("axios"); 
const { Videogame, Genre } = require('../db'); 

const getVideogamesId = async (req, res) => { // Definición de la función 'pokemonid' para manejar una solicitud HTTP
  try { // Inicio de un bloque 'try' para manejar errores
    const { idVideogame } = req.params; // Obtención del parámetro "idPokemon" de la solicitud
    
    if (isNaN(idVideogame)) { // Verificación si el "idPokemon" no es un número (suponemos que se refiere al ID en la base de datos)
      const localGame = await Videogame.findOne({
        where: { id: idVideogame },
        include: Genre, // Inclusión del tipo del Pokémon
      });

      if (localGame) {
        return res.status(200).json(localGame); // Si se encuentra en la base de datos local, devuelve los detalles locales
      }
    }

    const { data } = await axios.get(`${URL}${idVideogame}?key=304c3f1c3f94445eb62c14dadef998c1`); // Realización de una solicitud HTTP a la API de Pokémon para obtener detalles

    if (!data.name) { // Verificación si la respuesta no contiene el nombre del Pokémon
      throw new Error("No se encontró");
    }

    const character = { // Creación de un objeto "character" con la información del Pokémon obtenida
        id: data.id,
        name: data.name,
        description: data.description,
        platforms: data.platforms?.map(platform => platform.platform.name),
        image: data.background_image,
        genres: data.genres?.map(genre => genre.name),
        released: data.released,
        rating: data.rating
    };

    return res.status(200).json(character); // Responder con un estado 200 (éxito) y el objeto "character" como JSON

  } catch (error) { 
    return error.message.includes("encontró")
      ? res.status(404).send(error.message) // Si el mensaje de error incluye "ID", responder con un estado 404 (no encontrado)
      : res.status(500).send(error.message); // De lo contrario, responder con un estado 500 (error interno del servidor)
  }
};

module.exports = {
  getVideogamesId
};