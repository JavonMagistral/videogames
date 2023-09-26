import Card from "../Card/Card";
import style from "./CardDetails.module.css";

const CardDetails = ({currentVideoGames}) => {


    return (
        <div className={style.card}>
            {currentVideoGames?.map((currentVideoGames) => {
             return <Card 
             key={currentVideoGames.id} 
             id={currentVideoGames.id} 
             name={currentVideoGames.name} 
             genres={currentVideoGames.genres} 
             image={currentVideoGames.image} />
             })}

        </div>
    )
}

export default CardDetails;