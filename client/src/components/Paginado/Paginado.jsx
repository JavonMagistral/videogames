import style from "./Paginado.module.css";

const Paginado = ({ videogamesPerPage, videogames, paginado }) => {
  const pagesNumber = [];

  for (let i = 1; i <= Math.ceil(videogames / videogamesPerPage); i++) {
    pagesNumber.push(i);
  }

  return (
    <div className={style.paginado}>
      <nav>
        <ul className={style.paginadoList}>
          {pagesNumber.map((number) => (
            <ul key={number} className={style.paginadoItem}>
              <button className={style.paginadoButton} onClick={() => paginado(number)}>{number}</button>
            </ul>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Paginado;

  