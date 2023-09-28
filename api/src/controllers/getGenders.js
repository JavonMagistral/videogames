const axios = require('axios');
const { Genre } = require('../db');
const { KEY } = process.env;

const getGenre = async (req, res) => {
    try {
        // Verifica si la base de datos está vacía
        const dbGenre = await Genre.findAll();
        const apiResponse = await axios.get(`https://api.rawg.io/api/genres?key=${KEY}`);
        const apiGenre = apiResponse.data.results;

        if (dbGenre.length === 0) {
            // Si la base de datos está vacía, obtén los tipos de la API
            // Guarda los tipos de la API en la base de datos
            await Genre.bulkCreate(apiGenre.map((genre) => ({ name: genre.name })));

            // Vuelve a consultar los tipos de la base de datos
            const updatedDbTypes = await Genre.findAll();
            return res.status(200).json(updatedDbTypes);
        } else {
            // Mapea apiGenre para obtener un arreglo de nombres de géneros
            const apiGenreNames = apiGenre.map((genre) => genre.name);

            // Filtra los nombres de géneros que no existen en la base de datos
            const newGenreNames = apiGenreNames.filter((name) => !dbGenre.some((genre) => genre.name === name));

            // Agrega los nuevos géneros a la base de datos
            await Genre.bulkCreate(newGenreNames.map((name) => ({ name })));

            // Vuelve a consultar los tipos de la base de datos actualizados
            const updatedDbTypes = await Genre.findAll();
            return res.status(200).json(updatedDbTypes);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ocurrió un error al obtener los géneros' });
    }
}

module.exports = {
    getGenre
};
