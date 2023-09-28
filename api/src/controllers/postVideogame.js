const { Videogame, Genre } = require('../db');

const postVideogame = async (req, res) => {
  try {
    // Obtiene los datos del cuerpo de la solicitud
    const { name, description, platforms , genres, image , released , rating  } = req.body; 
    //console.log(genres);
    // Comprueba que se hayan proporcionado todos los datos
    if (!name || !description || !platforms || !image || !genres || !released || !rating)
     res.status(401).json({ message: "Faltan datos" });

   

    // Crea el nuevo juego en la base de datos
    const newVideogame = await Videogame.create({
        name,
        description,
        platforms,
        image,
        released,
        rating, 
    });

    const typesPromisesArr = genres.map(async(genre)=>{
      const [foundGenre] = await Genre.findOrCreate({
        where:{name: genre},
        defaults:{name: genre}
      })
      //console.log(`Género encontrado o creado: ${foundGenre.name}`);
      return foundGenre;
    });
    const foundTypes = await Promise.all(typesPromisesArr)
  
    // Relaciona el nuevo Pokémon con los tipos indicados
    //console.log("Antes de relacionar géneros con el videojuego:", foundTypes);

    await newVideogame.addGenre(foundTypes);

    //console.log("Después de relacionar géneros con el videojuego:", foundTypes);

    //await console.log(newVideogame);

    return res.status(201).json({ videojuego: newVideogame, genres: newVideogame.genres });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postVideogame
};
