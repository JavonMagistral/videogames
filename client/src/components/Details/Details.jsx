import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [videojuego, setVideojuego] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:3001/videogames/${id}`);
        const { data } = response;
        setVideojuego(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h2>Name: {videojuego.name}</h2>
      <h2>ID: {videojuego.id}</h2>
      <img src={videojuego.image} alt={videojuego.name} />
      <h2>Platforms: {videojuego.platforms && videojuego.platforms.join(", ")}</h2>
      <div dangerouslySetInnerHTML={{ __html: videojuego.description }} />
      <h2>Released: {videojuego.released}</h2>
      <h2>Rating: {videojuego.rating}</h2>
      <h2>Genres: {videojuego.genres && videojuego.genres.join(", ")}</h2>
    </div>
  );
};

export default Detail;
