const axios = require ("axios");
const API_URL = "https://api.rawg.io/api/games?search=";
const {Videogame} = require ("../db");
const {KEY} = process.env

const gameName = async (req, res) => {
  const {name} = req.query;
    try {
      // Obtener el nombre de la consulta (query param)
      if (!name) {
        return res.status(400).json({ message: "Debe proporcionar un nombre de Videojuego." });
      }
  
      // Convertir el nombre de la consulta a minúsculas para hacer una búsqueda insensible a mayúsculas y minúsculas
      const lowercaseNameQuery = name.toLowerCase();
  
      try {
        // Construir la URL de la API de Pokémon con el nombre proporcionado
        const videoGamesAPIUrl = `${API_URL}${lowercaseNameQuery}&key=${KEY}`;
  
        // Realizar una solicitud a la URL construida
        const response = await axios.get(videoGamesAPIUrl);
        const videogameAPI = response.data.results;
        if (videogameAPI.length > 0) {
            const gamesAPI = videogameAPI.map(game => {
                let videogame = {
    
                id: game.id,
                name: game.name,
                description: game.description,
                platforms: game.platforms?.map(platform => platform.platform.name),
                image: game.background_image,
                genres: game.genres?.map(genre => genre.name),
                released: game.released,
                rating: game.rating
                    }
              return videogame;
            });
                   
        // Responder con el Pokémon encontrado
        res.status(200).json(gamesAPI.splice(0, 15));
        };
     
      } catch (error) {
        // Si no se encuentra en la API, buscar en la base de datos
        const foundGame = await Videogame.findAll(); 
          let gameName;
        for(let i=0;i<foundGame.length;i++){
          gameName=foundGame[i].name.toLowerCase();
          if(gameName===name){
            res.status(200).json(foundGame[i]);
            //para romper el for
            return 
          }
        }
      }
    } catch (error) {
      // Manejar otros errores
      res.status(500).json({ message: "Error interno del servidor." });
    }
  };

  module.exports ={
    gameName
  };