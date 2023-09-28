import { NavLink } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ id, name, genres, image }) => {
  if (!(typeof genres[0] === "string")) {
    for (let i = 0; i < genres.length; i++) {
      genres[i] = genres[i].name;
    }
  }

  return (
    <div className={style.contain}>
      <NavLink className={style.navlink} to={`/detail/${id}`}>
        <div>
          <img src={image} alt={name} className={style.tamañoImg} />
          <h2 className={style.info}>{name}</h2>
          <div className={`${style.info} ${style.genres}`}>
            {/* Utiliza la clase "genres" para limitar la altura */}
            {genres.map((genre, index) => (
              <div key={index}>{genre}</div>
            ))}
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Card;



