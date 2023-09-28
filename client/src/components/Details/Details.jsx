import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./Details.module.css";

const Detail = () => {
  const { id } = useParams();
  const [videojuego, setVideojuego] = useState({});
  
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:3001/videogames/${id}`);
        const { data } = response;
         if (data.name) {
          if (typeof data.genres[0] === 'object') {
            data.genres = data.genres.map((genre) => genre.name);
          }
        }
        setVideojuego(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [id]);

 

  return (
    <div>
      <img className={style.img} src={videojuego.image} alt={videojuego.name} />
         <div  className={style.containInfo}>     
            <h2>Name: {videojuego.name}</h2>
            <h2>ID: {videojuego.id}</h2>
            <h2>Platforms: {videojuego.platforms && videojuego.platforms.join(", ")}</h2>
            <div className={style.description} dangerouslySetInnerHTML={{ __html: videojuego.description }} />
            <h2>Released: {videojuego.released}</h2>
            <h2>Rating: {videojuego.rating}</h2>
            <h2>Genres: {videojuego.genres && videojuego.genres.join(", ")}</h2>
         </div>
    </div>
 );
};

export default Detail;
