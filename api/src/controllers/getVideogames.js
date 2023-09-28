const axios = require("axios");
const { Videogame, Genre } = require("../db.js");
const { KEY } = process.env;
const getVideogames = async (req, res) => {
  try {
    let allVideogames = [];
    const desiredGameCount = 16; // Número deseado de juegos

    let nextPage = 1;
    let totalPages = 1;

    while (nextPage <= totalPages && allVideogames.length < desiredGameCount) {
      const URL = `https://api.rawg.io/api/games?key=${KEY}&page=${nextPage}`;
      const { data } = await axios.get(URL);

      const videojuegosLs = data.results;

      const videogamesDetail = videojuegosLs.map((videogame) => {
        return {
          id: videogame.id,
          name: videogame.name,
          platforms: videogame.platforms?.map((platform) => platform.platform.name),
          image: videogame.background_image,
          genres: videogame.genres?.map((genre) => genre.name),
          released: videogame.released,
          rating: videogame.rating,
        };
      });

      allVideogames = [...allVideogames, ...videogamesDetail];
      totalPages = data.count / data.results.length;
      nextPage++;
    }

    const dbVideogames = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    const combinedVideogames = [...dbVideogames, ...allVideogames.slice(0, desiredGameCount)];

    res.status(200).json(combinedVideogames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getVideogames,
};
