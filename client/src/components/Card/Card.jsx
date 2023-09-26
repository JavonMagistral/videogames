// import { NavLink } from "react-router-dom";
// import {connect } from "react-redux";
// import { useState, useEffect } from "react";
// import { addFav, removeFav } from "../../redux/actions";

import { NavLink } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({id, name, genres, image}) => {






    return (
        <div>
            <NavLink to={`/detail/${id}` }>
            <div>
                
                <img src={image} alt={name} className={style.tamañoImg}/>
                <h2>{name}</h2>
                <h2>{genres}</h2>
      
            </div>
            </NavLink>
        </div>
    )

}


export default Card;


